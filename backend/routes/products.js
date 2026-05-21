const express = require('express')
const {productData} = require('../controllers/productController')
const {womensTrendingProducts,mensTrendingProducts} = require('../controllers/trendingproducts.controller')

const router = express.Router()

router.route('/getproduct').get(productData)
router.route('/tendingProducts/women').get(womensTrendingProducts)
router.route('/tendingProducts/mens').get(mensTrendingProducts)
module.exports = router