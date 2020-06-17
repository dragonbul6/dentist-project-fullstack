const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('./configDatabase')
 var pool = new Pool(config)


 /**ส่งแบบฟอร์ม OM */
app.post('/OM',(req,res) => {
    let {HN,answers,TN,doc_id,interval} = req.body
getConductIdByHN(HN,(conductId) => {
    pool.connect((err,db,done) => {
        db.query('INSERT INTO public."Warehouse_OM"("TN", "HN", doc_id, answer,date,interval,conduct_id)VALUES ($1, $2, $3, $4,current_timestamp,$5,$6)',[TN,HN,doc_id,JSON.stringify(answers),interval,conductId])
          .then(()=>done())
        
    
})
})
  

})
/**ฟังชั้นเพื่อการดึง conduct id ตัวล่าสุด */
function getConductIdByHN(hn,fn){
    pool.connect((err,db,done) => {
        if(err){
            done()
        }else{
            db.query('SELECT Max(conduct_id) FROM public."conductStore" where "HN" = $1',[hn],(err,result) => {
                done()
                if(err){
                    console.log(err)
                }else{
                    return fn(result.rows[0].max)
                }
            })
        }
    })
}

// app.post('/CreateRelactionOM',(req,res) => {
//     getConductMax((conductID) => {
//         getOMMax((omid) => {
//            console.log(conductID,omid)
//             pool.connect((err,db,done) => {
//                 db.query('INSERT INTO public."Relation_OM"(om_id, conduct_id)  VALUES ($1, $2)',[omid,conductID])
//                 .then(()=>done())
//             })
//         } )
//     })
    
    
// })

// function getConductMax(fn){
//     pool.connect((err,db,done) => {
//         if(err){
//             done()
//         }else{
//                db.query('SELECT MAX(conduct_id) FROM public."conductStore"',(err,result) => {
//                 done()
//                 if(err){

//                 }else{
                   
//                   return fn(result.rows[0].max)
 
//                 }
//             })
            
//         }
//     })
// }

// function getOMMax(fn){
//     pool.connect((err,db,done) => {
//         if(err){
//             done()
//         }else{
//                db.query('SELECT Max(id) FROM public."Warehouse_OM";',(err,result) => {
//                 done()
//                 if(err){

//                 }else{
                   
//                   return fn(result.rows[0].max)
 
//                 }
//             })
            
//         }
//     })
// }

/** โชว์แบบฟอร์ม OM */
app.post('/getOM',(req,res) => {
    pool.connect((err,db,done) => {
        if(err){
            done()
        }else{
            db.query('SELECT id, "TN", "HN", doc_id,answer, date ,status,interval,conduct_id FROM public."Warehouse_OM" where "HN" = $1 and doc_id = $2',[req.body.HN,req.body.doc_id],
            (err,result) => {
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