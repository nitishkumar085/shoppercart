const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

//creating a class to or prototype to create new objects for database
const sellerRegistrationSchema = new mongoose.Schema({
    name:{
        type:String,
         required:[true,"enter name"],
    },
    email:{
         type:String,
        required:[true,"enter email"],
        unique:true,

    },
    password:{
         type:String,
         required:[true,"enter password"],
    },
    isSeller:{
        type:Boolean,
        default:true,
    },
     createdAt: {
    type: Date,
    default: Date.now, // current date & time
  },

})

sellerRegistrationSchema.pre('save',async function(){
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

sellerRegistrationSchema.methods.comparePassword = async function(userPassword){

    try{
        

        return bcrypt.compare(userPassword,this.password)
    }
    catch(error)
    {
        console.log(error)
    }
}
sellerRegistrationSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id ,name:this.name},
        process.env.JWTTOKENSELLER ,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// create object 
const sellers = new mongoose.model('seller',sellerRegistrationSchema)

module.exports = sellers