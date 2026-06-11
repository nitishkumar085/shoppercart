const express = require('express')
const { signup } = require('../controllers/users/userAuthController')

const router = express.Router()


router.route('/signup').post(signup)



module.exports = router