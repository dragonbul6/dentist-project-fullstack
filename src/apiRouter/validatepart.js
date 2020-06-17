const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool

const app = express();

app.use(cors())
app.use(bodyParser.json())

const config = require('./configDatabase')
 var pool = new Pool(config)


app.post('/getCode',(req,res) => {
    pool.connect((err,db,done) => {
        if(err){
            done()
            return res.send(err)
        }else{
            db.query('SELECT passcode FROM public."passCodeStore" where "TN" = $1',[req.body.TN],(err,result) => {
               done()
                if(err){
                    return res.json(err)
                }else{
                    return res.json(result.rows[0])
                }
            })
        }
    })
})

// app.put('/updateform',(req,res) => {
//     pool.connect((err,db,done) => {
//         if(err){
//             done()
//         }else{
//             db.query('UPDATE public."Warehouse_OM" SET status=true WHERE id =$1',[req.body.id])
//         }
//     })
// })



 module.exports = app