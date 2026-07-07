const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const userRegistration  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter your name"]
    },
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

// .pre() method is used to do somthing before doing any action  in database, it act as middleware, it take 3 arguments 1.method 2.options 3. callbackfuncttion
userRegistration.pre('save',async function(){
    // this checks password is modified or not 
    if(!this.isModified('password')) return ;

    try{
        const hashPassword = await bcrypt.hash(this.password,12)
        this.password = hashPassword
        next();
    }
    catch(error)
    {
        console.log(error)
    }

   
})

userRegistration.methods.comparePassword = async function(userPassword){

    try{
        

        return bcrypt.compare(userPassword,this.password)
    }
    catch(error)
    {
        console.log(error)
    }
}

userRegistration.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id ,name:this.name},
        process.env.JWTToken ,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

const users = new mongoose.model('user',userRegistration)

module.exports = users