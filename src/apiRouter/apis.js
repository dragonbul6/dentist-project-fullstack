const SECRET = "MY_SECRET_KEY";
const payload = []
const Pool = require('pg').Pool
const cors = require('cors')
const jwt = require("jwt-simple");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const requireJWTAuth = passport.authenticate("jwt",{session:false});

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const config = require('./configDatabase')
 var pool = new Pool(config)
 
 app.use(bodyParser.json());
 app.use(cors())

function checkUsername(payload,fn){
   pool.connect((err,db,done) => {
      if(err){
         return fn(false)
      }else{
         db.query('select username from public.account where username = $1',[payload[0].sub],(err,result) => {
            done()
            if (payload[0].sub === result.rows[0].username) {
                  return fn(true)
                  }
            else {
                 return fn(false)
                  }}
         )
      
      }
   }) 
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: SECRET
 };
 const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   
   checkUsername(payload,(result) => {
      if(result){
         done(null, true);
      }else{
         done(null,false);
      }
   })
   
 })
 
 passport.use(jwtAuth);

 
 
 app.post("/", requireJWTAuth, (req, res) => {
  var decoded = decodetoken(req.headers.authorization)
  var id = decoded[1].id
   pool.connect((err,db,done)=>{
      db.query('select memberlist.student_code,memberlist.forename,memberlist.surname from public.memberlist where public.memberlist.id = $1',[id],
      (err,result)=>{
         done()
         if(err){
            return res.send(err)
         }else{
         
            return res.json(result.rows)
         }
         
      })
   })
})

 function decodetoken(token){
    var decoded = jwt.decode(token,SECRET)
    return decoded
 }


function getUsername(username,password,fn){
   pool.connect((err,db,done) => {
      if(err){
         return null
      }else{
         db.query('select username,password from public.account where username = $1',[username],(err,result) => {
                  var data = result.rows[0]
                  done()
                  if(data){
                     if(data.password === password){
                        return fn(true)
                     }else{
                        return fn(false)
                     }
                  }
                  else{
                     return fn(false)
                  }
                  
               
         })
      }
     
}) 

 }


 const checkLevel = (req,res,next) =>{
   pool.connect((err,db,done) => {
      
         db.query('select level from public.account where username = $1',[req.body.username],(err,res) => {
            payload.push({level :res.rows[0].level})
            done()
            next()
         }
            )
      
   })
  
 }


const getidAccount = (req,res,next) =>{
   pool.connect((err,db,done) => {
      
         db.query('select accountid from public.account where username = $1',[req.body.username],(err,res) => {
            payload.push({id :res.rows[0].accountid})
            done()
            next()
         }
            )
      
   })
  
 }


 const loginMiddleWare = (req, res, next)=>{
   
   getUsername(req.body.username,req.body.password,(result)=>{
   if (result){      
      var username = req.body.username
      payload.push({sub:username})
      next()
    } 
    else {
     res.json(null)
    }
   
   })
 }


app.post("/login", loginMiddleWare,getidAccount,checkLevel,(req,res)=>{
   var encode = jwt.encode(payload,SECRET)
   payload.splice(0,payload.length)

   return res.json(encode)
})

app.get('/teachers',(req,res) => {
    pool.connect((err,db,done)=>{
       if(err){
          console.log(err)
       }else{
          db.query("select account.accountid,memberlist.forename,memberlist.surname from public.memberlist inner join public.account on public.memberlist.id = public.account.accountid where public.account.level = 1"
          ,(err,result) => {
             done()
            if(err){
               return res.send(err)
             }else{
                return res.json(result.rows)
             }
          
            })
       }
    
      })
 })

 module.exports = app