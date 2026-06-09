const express = require('express')
const {productData, addProduct} = require('../controllers/productController.js')
const {womensTrendingProducts,mensTrendingProducts} = require('../controllers/trendingproducts.controller.js')


const router = express.Router()

router.route('/getproduct').get(productData)
router.route('/tendingProducts/women').get(womensTrendingProducts)
router.route('/tendingProducts/mens').get(mensTrendingProducts)
router.route('/addProduct').post(addProduct)
module.exports = router