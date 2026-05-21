const product = require("../models/products")

const womensTrendingProducts = async (req,res)=>{
        const newProducts = await product.aggregate([
            {
              $match: {
                $and: [
                  {
                    $or: [
                      { category: "skin-care" },
                      { category: "beauty" },
                      { category: "tops" },
                      { category: "womens-bags" },
                      { category: "womens-dresses" },
                      { category: "womens-shoes" }
                    ]
                  },
                  { rating: { $gt: 4 } }
                ]
              }
              
            },
            {
              $group: {
                _id: "$category", // Group by category
                items: { $push: "$$ROOT" } // Collect documents for each category
              }
            },
            {
              $project: {
                _id: 1,
                items: { $slice: ["$items", 2] } // Limit to 2 items per category
              }
            },
            {
              $unwind: "$items" // Unwind items array back into individual documents
            },
            {
              $replaceRoot: { newRoot: "$items" } // Replace root to restructure documents
            },
            {$limit:5}
          ])
        //   console.log(newProducts)
          res.status(200).send({message:"sucess",
            length:newProducts.length,
            data:newProducts,
            
          })
}

const mensTrendingProducts = async(req,res)=>{
  const newProducts = await product.aggregate([
            {
              $match: {
                $and: [
                  {
                    $or: [
                      { category: "mens-shirts" },
                      { category: "mens-shoes" },
                      { category: "mens-watches" },
                    ]
                  },
                  { rating: { $gt: 4 } }
                ]
              }
              
            },
            {
              $group: {
                _id: "$category", // Group by category
                items: { $push: "$$ROOT" } // Collect documents for each category
              }
            },
            {
              $project: {
                _id: 1,
                items: { $slice: ["$items", 2] } // Limit to 2 items per category
              }
            },
            {
              $unwind: "$items" // Unwind items array back into individual documents
            },
            {
              $replaceRoot: { newRoot: "$items" } // Replace root to restructure documents
            },
            {$limit:5}
          ])
        //   console.log(newProducts)
          res.status(200).send({message:"sucess",
            length:newProducts.length,
            data:newProducts,
            
          })
}

module.exports = {womensTrendingProducts,mensTrendingProducts}