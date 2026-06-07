const { default: mongoose } = require('mongoose')
const app = require('./app.js')
const dotenv = require('dotenv')
dotenv.config()



const port  = process.env.PORT || 8080

const db_connection = process.env.DB_CONNECTION.replace('<password>',process.env.PASSWORD)


mongoose.connect(db_connection)
.then(()=>{
    console.log('database connected')
})
.catch((err)=>{console.log(err)})


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})