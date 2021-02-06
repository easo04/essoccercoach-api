const express = require('express')
const router = express.Router()

let exerciceController = require('../controllers/exerciceController');

//routes
router.get('/', exerciceController.list_all_exercices)
router.get('/:id', exerciceController.get_exercice_by_id)
router.get('/category/:category', exerciceController.get_exercices_by_category)
router.get('/populars/', exerciceController.get_popular_exercices)
router.post('/', exerciceController.create_exercice)
router.delete('/:id', exerciceController.delete_exercice)

module.exports = router