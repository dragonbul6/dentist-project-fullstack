const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const MockItem = require('../apiRouter/patientlist')

const app = express();

app.use(cors())
app.use(bodyParser.json())


const config = require('./configDatabase')
 var pool = new Pool(config)

app.post('/dashboard',(req,res) => {
  pool.connect((err,db,done) => {
    if(err){
      return res.send(err)
    }else{
      db.query('SELECT * FROM public."patientList" where doc_id = $1',[req.body.id],(err,result) => {
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

app.get('/getPatient',(req,res) => {

  return res.json(MockItem)
  

})

app.post('/addPatient',(req,res) => {
    let {id,patient} = req.body
    
  pool.connect((err,db,done) => {
      if(err){
        return res.send(err)
      }else{
        db.query('INSERT INTO public."patientList"("HN", forename, surname,doc_id) VALUES ($1, $2, $3,$4)',[patient[0].HN,patient[0].firstname,patient[0].surname,id],
        (err,result) => {
          done()
          if(err){
            return res.send(false)
          }else{
            return res.send(true)
          }
        })
        
      }
    })
  
})

/* TEACHER API */
app.get('/getStudent',(req,res) => {
  pool.connect((err,db,done) => {
    if(err){
      return res.json(err)
    }else{
      let str = 'SELECT memberlist.forename, memberlist.surname, memberlist.student_code FROM public.account inner join  public.memberlist on public.memberlist.id = public.account.accountid where level = 0'
      db.query(str,(err,result) => {
        done()
        if(err){
          return res.json(err)
        }else{
          return res.json(result.rows)
        }
      })
    }
  })
})

app.post('/getPatientbyTeacher',(req,res) => {
  pool.connect((err,db,done) => {
    if(err){
      done()
      return res.json(err)
    }else{
      let str = 'SELECT "HN", forename, surname, doc_id, id, conduct_id FROM public."patientList" where doc_id = $1'
      db.query(str,[req.body.id],(err,result) => {
        done()
        if(err){
          return res.json(err)
        }else{
          return res.json(result.rows)
        }
      })
    }
  })
})


module.exports = app