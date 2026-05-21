const mongoose = require('mongoose')


const newProduct = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"enter product name"]
    },
    id:{
        type:Number,
        required:[true,"enter product id"]
    },
    images:{
       type :Array,
        required:[true,"enter images"]
    },
    thumbnail:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    discription:{
        type:String,
        max:20,
    },
    brand:{
        type:String,
        // required:[true,"enter thumbnail"]
    },
    price:{
        type:Number,
        required:[true,"enter thumbnail"]
    },
    stock:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    
    meta:{
        type:Object,
        required:[true,"enter thumbnail"]
    },
    returnPolicy:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    reviews:{
        type:Array,
        required:[true,"enter thumbnail"]
    },
    availabilityStatus:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    warrantyInformation:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    dimensions:{
        type:Object,
        required:[true,"enter thumbnail"]
    },
    sku:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    tags:{
        type:Array,
        required:[true,"enter thumbnail"]
    },
    stock:{
        type:String,
        required:[true,"enter thumbnail"]
    },
    rating:{
        type:Number,
        required:[true,"enter thumbnail"]
    },
    discountPercentage:{
        type:Number,
        required:[true,"enter thumbnail"]
    },
    category:{
        type:String,
        required:[true,"enter thumbnail"]
    },


})


const product = new mongoose.model('product',newProduct)

module.exports= product