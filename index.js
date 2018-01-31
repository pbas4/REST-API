'user strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// set up express app
const app = express()

// Conect to mongoDB
mongoose.connect('mongodb://localhost/ninjago')
mongoose.Promise = global.Promise // because deprecated

app.use(express.static('public'))

// PArse data to JSON
app.use(bodyParser.json())

// inicialize routes
app.use('/api', require('./routes/api'))

// Error handling middleware
app.use((err, req, res, next) => {
    // console.log(err)
    res.status(422).send({ error: err.message })
})

// port listening to
const PORT = process.env.port || 3500


// listen for requests
app.listen(PORT, () => {
    console.log('now listening for requests')
})