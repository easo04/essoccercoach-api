const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let exerciceController = require('../controllers/exerciceController');

//routes
router.get('/', exerciceController.list_all_exercices)
router.get('/:id', exerciceController.get_exercice_by_id)
router.get('/category/:category', exerciceController.get_exercices_by_category)
router.get('/populars/get-all', exerciceController.get_popular_exercices)
router.post('/', authorize(true), exerciceController.create_exercice)
router.delete('/:id', authorize(true), exerciceController.delete_exercice)

module.exports = router