const express = require('express')
const { sellerSignup, sellerLogin } = require('../controllers/seller/sellerAuthController')

const router = express.Router()

router.route("/signup").post(sellerSignup)
router.route("/login").post(sellerLogin)

module.exports = router