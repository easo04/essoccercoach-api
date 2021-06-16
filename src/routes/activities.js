const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const activityController = require('../controllers/activityController');

//routes
router.post('/', authorize(), activityController.add_activity)
router.get('/:id', authorize(), activityController.get_activity_by_id)
router.delete('/:id', authorize(), activityController.delete_activity)


module.exports = router