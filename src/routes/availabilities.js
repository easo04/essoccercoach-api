const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const availabilityController = require('../controllers/availabilityController');

//routes
router.post('/', authorize(), availabilityController.add_availability)
router.post('/update', authorize(), availabilityController.update_availability)
router.get('/:id', authorize(), availabilityController.get_availability_by_id)
router.get('/get-availabilities-by-team/:id', authorize(), availabilityController.get_availabilities_by_activity)
router.delete('/:id', authorize(), availabilityController.delete_availability)


module.exports = router