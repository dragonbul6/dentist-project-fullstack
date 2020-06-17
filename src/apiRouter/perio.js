const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Pool = require('pg').Pool
const app = express();
app.use(cors())
app.use(bodyParser.json())


var CreateAPIs = require('./function_perio/CreateAPIs_perio')
var GetAPIs = require('./function_perio/GetAPIs_perio')
var UpdateAPIs = require('./function_perio/UpdateApis_perio')

app.use(CreateAPIs)
app.use(GetAPIs)
app.use(UpdateAPIs)


module.exports = app