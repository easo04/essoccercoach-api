const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const alignementController = require('../controllers/alignementController');

//routes
router.post('/', authorize(), alignementController.add_alignement)
router.post('/update', authorize(), alignementController.update_alignement)
router.get('/:id', authorize(), alignementController.get_alignement_by_id)
router.get('/get-activity-summary/:id', authorize(), alignementController.get_alignement_by_activity)
router.delete('/:id', authorize(), alignementController.delete_alignement)


module.exports = router