const express = require("express");
const app = express();

var dashboard = require('./apiRouter/dashboard')
var apis = require('./apiRouter/apis')
var doc1 = require('./apiRouter/doc1')
var doc2 = require('./apiRouter/omAPIs')
var validate = require('./apiRouter/validatepart')
var perio = require('./apiRouter/perio')
var adminTools = require('./apiRouter/adminTools/adminTools')

app.use('/api/',dashboard) 
app.use('/api/',apis)
app.use('/api/',doc1)
app.use('/api/',doc2)
app.use('/api/',validate)
app.use('/api/',perio)
app.use('/admin/',adminTools)

 app.listen(3000,()=>{
     console.log('App listening 3000!')
 })