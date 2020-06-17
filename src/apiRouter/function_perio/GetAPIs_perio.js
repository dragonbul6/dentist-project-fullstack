const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('../configDatabase')
var pool = new Pool(config)

/* PREIVEW ZONE */

/**API ตัวนี้จะดึงรายการทั้งหมดของ perio แบ่งตาม วิชา */
app.post('/perio/:subject',(req,res) => {
    let str ='SELECT * FROM public."Perio_'+req.params.subject+'" where hn = $1 and doc_id = $2'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.body.hn,req.body.doc_id],(err,result) => {
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

/** ทำ CHARTING,SC&RP ด้วย*/
app.get('/Rescalling/:id',(req,res) => {
    let str = 'SELECT attempt, sel1, sel2, answer, finish, id ,date,kn FROM public."Perio_Rescalling" where id = $1'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.params.id],(err,result) => {
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

app.get('/Recheck/:id',(req,res) => {
    let str = 'SELECT attempt, sel1, sel2, answer, finish, id ,date,kn FROM public."Perio_Recheck" where id = $1'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.params.id],(err,result) => {
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

app.get('/Recall/:id',(req,res) => {
    let str = 'SELECT attempt, sel1, sel2, answer, finish, id ,date,kn FROM public."Perio_Recall" where id = $1'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.params.id],(err,result) => {
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

app.get('/Charting/:id',(req,res) => {
    let str = 'SELECT attempt, sel1, sel2, answer, finish, id ,date,kn FROM public."Perio_Charting" where id = $1'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.params.id],(err,result) => {
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

app.get('/ScnRp/:id',(req,res) => {
    let str = 'SELECT area,sel1, sel2, answer, finish, id ,date,kn FROM public."Perio_ScnRp" where id = $1'
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.params.id],(err,result) => {
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


app.post('/getDX',(req,res) => {

    let str = `SELECT * FROM 
    (
        SELECT 'Recheck' AS TABLE_NAME, sel1, sel2,hn,doc_id FROM public."Perio_Recheck"
        UNION ALL
        SELECT 'Rescalling' AS TABLE_NAME, sel1, sel2,hn,doc_id FROM public."Perio_Rescalling"
        UNION ALL
        SELECT 'Recall' AS TABLE_NAME, sel1, sel2,hn,doc_id FROM public."Perio_Recall"
        UNION ALL
        SELECT 'Charting' AS TABLE_NAME, sel1, sel2,hn,doc_id FROM public."Perio_Charting"
		UNION ALL
		SELECT 'SC&RP' AS TABLE_NAME, sel1, sel2,hn,doc_id FROM public."Perio_ScnRp"
    )A
    WHERE A.hn = $1 and A.doc_id = $2` 
    
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query(str,[req.body.hn,req.body.doc_id],(err,result) => {
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

app.post('/getAmountPerio',(req,res) => {
    let str = `SELECT * FROM 
    (
        SELECT 'Recheck' AS TABLE_NAME,count(doc_id) FROM public."Perio_Recheck" where doc_id = $1
        UNION ALL
        SELECT 'Rescalling' AS TABLE_NAME,count(doc_id) FROM public."Perio_Rescalling" where doc_id = $1
        UNION ALL
        SELECT 'Recall' AS TABLE_NAME,count(doc_id) FROM public."Perio_Recall" where doc_id = $1
        UNION ALL
        SELECT 'Charting' AS TABLE_NAME,count(doc_id) FROM public."Perio_Charting" where doc_id = $1
		UNION ALL
		SELECT 'SC&RP' AS TABLE_NAME,count(doc_id) FROM public."Perio_ScnRp" where doc_id = $1
    )A 
	`

    pool.connect((err,db,done) => {
        if(err){
            console.log(err)
        }else{
            db.query(str,[req.body.doc_id],(err,result) => {
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