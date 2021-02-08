const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let emailController = require('../controllers/emailController');

router.get('/', authorize(true), emailController.get_all)

router.post('/', emailController.add_email)

module.exports = router