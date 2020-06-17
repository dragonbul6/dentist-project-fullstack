const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('../configDatabase')
var pool = new Pool(config)


app.get('/student',(req,res) => {
    let str = 'SELECT forename, surname, student_code , public.account.username , public.account.password'+
	' FROM public.memberlist inner join public.account on public.memberlist.id = public.account.accountid'+ 
	' where public.account.level = 0'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,(err,result) => {
                done()
                if(err){
                    console.log(err)
                }else{
                    return res.json(result.rows)
                }
            })
        }
    })
})

module.exports = app