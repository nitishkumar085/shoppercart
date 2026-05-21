const mongoose = require('mongoose');


const productDetails = new mongoose.Schema({
    product_id :{
        type:String,
        required:[true,"enter product id"]
    },
    
})