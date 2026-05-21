const express = require('express')
const cors = require('cors')
const product = require('./routes/products')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/products',product)



module.exports = app