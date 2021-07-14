const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const noteController = require('../controllers/noteController');

//routes
router.post('/', authorize(), noteController.add_note)
router.get('/:id', authorize(), noteController.get_note_by_id)
router.delete('/:id', authorize(), noteController.delete_note)


module.exports = router