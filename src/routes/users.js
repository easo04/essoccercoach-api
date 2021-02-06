const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let userController = require('../controllers/userController');

//routes
router.get('/:id', authorize(), userController.get_user_by_id)
router.get('/', authorize(), userController.get_all_users)
router.post('/', userController.subscribe)
router.post('/login', userController.login)

module.exports = router