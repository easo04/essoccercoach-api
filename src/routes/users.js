const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let userController = require('../controllers/userController');

//routes
router.get('/:id', authorize(true), userController.get_user_by_id)
router.get('/', authorize(true), userController.get_all_users)
router.post('/signup', userController.subscribe)
router.post('/login', userController.login)
router.delete('/logout', authorize(), userController.logout)

module.exports = router