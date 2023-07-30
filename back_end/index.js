const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require('./database')

app.use(bodyParser.json())
app.use(cors("*"))
app.use(require('./routes'))


app.use((req, res) => {
    res.json({
        error: req.originalUrl
    })
})

app.listen(3000, (err) => {
    if(!err) console.log("Successfully connected to the server")
    else console.log("failure")
})
