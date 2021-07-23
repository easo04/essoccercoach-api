const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const seanceController = require('../controllers/seanceController');

//routes
router.post('/', authorize(), seanceController.add_seance)
router.get('/:id', authorize(), seanceController.get_seance_by_id)
router.get('/get-seance-by-activity/:id', authorize(), seanceController.get_seance_by_activity)
router.delete('/:id', authorize(), seanceController.delete_seance)


module.exports = router