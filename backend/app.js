const express = require('express')
const cors = require('cors')
const product = require('./routes/products')
const client = require('./routes/clientRoute')
const seller = require('./routes/sellerRoute')
const globalErrorHadler = require('./middleware/globalErrorhandler')

const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/v1/products',product)
app.use('/api/v1/client',client)
app.use('/api/v1/seller',seller)

app.use(globalErrorHadler);

module.exports = app