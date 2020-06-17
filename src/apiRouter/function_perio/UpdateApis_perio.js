const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('../configDatabase')
var pool = new Pool(config)

/* Update Zone */
app.put('/Rescalling/:id',(req,res) => {
    let {attempt,sel1,sel2,answer,finish,date} = req.body
    let str = 'UPDATE public."Perio_Rescalling" SET attempt=$1, sel1=$2, sel2=$3, answer=$4, finish=$5,date=$6 WHERE id=$7'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,req.params.id]).then(()=>done())
        }
    })
})

app.put('/Recall/:id',(req,res) => {
    let {attempt,sel1,sel2,answer,finish,date} = req.body
    let str = 'UPDATE public."Perio_Recall" SET attempt=$1, sel1=$2, sel2=$3, answer=$4, finish=$5,date=$6 WHERE id=$7'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,req.params.id]).then(()=>done())
        }
    })
})

app.put('/Charting/:id',(req,res) => {
    let {attempt,sel1,sel2,answer,finish,date} = req.body
    let str = 'UPDATE public."Perio_Charting" SET attempt=$1, sel1=$2, sel2=$3, answer=$4, finish=$5,date=$6 WHERE id=$7'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,req.params.id]).then(()=>done())
        }
    })
})

app.put('/Recheck/:id',(req,res) => {
    let {attempt,sel1,sel2,answer,finish,date} = req.body
    let str = 'UPDATE public."Perio_Recheck" SET attempt=$1, sel1=$2, sel2=$3, answer=$4, finish=$5,date=$6 WHERE id=$7'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,req.params.id]).then(()=>done())
        }
    })
})


/**CHARTING,RECHECK,RECALL,SC&RP */

module.exports = app