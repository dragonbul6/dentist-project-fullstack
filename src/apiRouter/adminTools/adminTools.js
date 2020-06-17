

const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())

var Student = require('./Student')


app.use(Student)


module.exports = app