const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('../configDatabase')
var pool = new Pool(config)

/* ส่งฟอร์ม perio แยกตากสาขาวิชา */

app.post('/sendRescaling',(req,res) => {
    let {attempt , sel1 , sel2 , answer,finish,HN,date,doc_id,interval,kn} = req.body
    getConductIdByHN(HN,(conduct_id)=>{
        pool.connect((err,db,done) => {
            if(err){
                done()
                return res.json(err)
            }else{
                    let str = 'INSERT INTO public."Perio_Rescalling"(attempt, sel1, sel2, answer ,finish,date,hn,conduct_id,doc_id,interval,kn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
                    db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,HN,conduct_id,doc_id,interval,kn])
                done()
            }
        })
    })

    
    
})

function getConductIdByHN(hn,fn){
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query('SELECT MAX(conduct_id) FROM public."conductStore" where "HN" = $1',[hn],(err,result) => {
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

app.post('/sendRecheck',(req,res) => {
    
    let {attempt , sel1 , sel2 , answer,finish,HN,date,doc_id,interval,kn} = req.body
    let str = 'INSERT INTO public."Perio_Recheck"(attempt, sel1, sel2, answer ,finish,date,hn,conduct_id,doc_id,interval,kn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    
    getConductIdByHN(HN,(conduct_id)=>{
        pool.connect((err,db,done) => {
            if(err){
                done()
                return res.json()
            }else{
                db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,HN,conduct_id,doc_id,interval,kn])
            done()
            }
        })
    })
})

app.post('/sendRecall',(req,res) => {
    let {attempt , sel1 , sel2 , answer,finish,HN,date,month,doc_id,interval,kn} = req.body
    let str = 'INSERT INTO public."Perio_Recall"(attempt, sel1, sel2, answer ,finish,date,hn,conduct_id,month,doc_id,interval,kn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)'
    
    getConductIdByHN(HN,(conduct_id) => {
        pool.connect((err,db,done) => {
            if(err){
                done()
                return res.json()
            }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,HN,conduct_id,month,doc_id,interval,kn])
            done()
            }
        })
    })  
})

app.post('/sendCharting',(req,res) => {
    let {attempt , sel1 , sel2 , answer,finish,HN,date,doc_id,interval,kn} = req.body
    let str = 'INSERT INTO public."Perio_Charting"(attempt, sel1, sel2, answer ,finish,date,hn,conduct_id,doc_id,interval,kn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'  
    
    getConductIdByHN(HN,(conduct_id) =>{
        pool.connect((err,db,done) => {
            if(err){
                done()
                return res.json()
            }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,HN,conduct_id,doc_id,interval,kn])
            done()
            }
        })
    })
    
})

app.post('/sendScandRp',(req,res) => {
    let {attempt , sel1 , sel2 , answer,finish,HN,date,area,doc_id,interval,kn} = req.body
    let str = 'INSERT INTO public."Perio_ScnRp"(attempt, sel1, sel2, answer ,finish,date,hn,conduct_id,area,doc_id,interval,kn) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)' 
    getConductIdByHN(HN,(conduct_id) => {
        pool.connect((err,db,done) => {
            if(err){
                done()
                return res.json()
            }else{
            db.query(str,[attempt,sel1,sel2,JSON.stringify(answer),finish,date,HN,conduct_id,JSON.stringify(area),doc_id,interval,kn])
            done()
            }
        })
    })
    
})


module.exports = app