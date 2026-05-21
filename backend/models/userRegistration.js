const mongoose = require('mongoose')


const userRegistration  = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"enter email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,'enter password']
    }

})


const users = new mongoose.model('user',userRegistration)

module.exports = users