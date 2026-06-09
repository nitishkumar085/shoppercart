 const product = require("../models/product")
 
 const productData = async (req,res)=>{
    try{
        const data = await product.find()
        
        res.status(200).json({
            products:[...data],
            length:data.length
        })
        
    }
    catch(err)
    {
        console.log(err)
    }
 }

 const addProduct = async(req,res)=>{
    try{
       
        // console.log(req.body)
        const data = await product.create(req.body)
        res.status(201).json({message:"product added",data:data})
        
    }
    catch(err)
    {
        console.log(err)
    }
 }

 module.exports = {productData,addProduct}