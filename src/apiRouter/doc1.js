const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool

const app = express();
app.use(cors())
app.use(bodyParser.json())


const config = require('./configDatabase')
 var pool = new Pool(config)

app.post('/doc1',(req,res) => {
    let {HN,doc_id,TN,answer} = req.body

    pool.connect((err,db,done) => {
        if(err){
            return res.json(err)
        }else{ 
            db.query('INSERT INTO public."conductStore"("HN", doc_id, "TN", answer) VALUES ($1, $2, $3, $4)',[HN,doc_id,TN,JSON.stringify(answer)])
            .then(()=>done())
            
        }
    
    })

})

app.post('/conductTLA',(req,res) => {
    let {hn,doc_id,kn} = req.body
    let str = `INSERT INTO public."TLA"(conduct_id, kn) VALUES (&1, &2)`


    pool.connect((err,db,done) => {
        if(err){
            console.log(err)
        }else{
           getConductIdByidandHN(hn,doc_id,(conduct_id) => {
            db.query(str,[conduct_id,kn],(err,result) => {
                done()
                if(err){
                    console.log(err)
                }
            })
           })
            
        }
    })
})

function getConductIdByidandHN(hn,doc_id,fn){
    pool.connect((err,db,done) => {
        if(err){
            done()
            console.log(err)
        }else{
            db.query('SELECT MAX(conduct_id) FROM public."conductStore" where "HN" = $1 and doc_id = $2',[hn,doc_id],(err,result) => {
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

app.post('/getPreivewconduct',(req,res) => {
    pool.connect((err,db,done) => {
        if(err){
            done()
            return res.json(err)
        }else{
            db.query('SELECT * FROM public."conductStore" where conduct_id = $1',[req.body.id],(err,result)=>{
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        return res.json(result.rows[0])
                    }
                
            })
        }
    })
})

app.get('/conduct/:id',(req,res) => {
    let str = 'SELECT "TN" FROM public."conductStore" where conduct_id = $1'
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
                    return res.json(result.rows[0].TN)
                }
            })
        }
    })
})

app.get('/conductbydocid/:id',(req,res) => {
    let str = `SELECT * FROM public."conductStore" where doc_id =$1`
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




module.exports = app