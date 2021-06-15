const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const coachController = require('../controllers/coachController');

//routes
router.post('/', authorize(), coachController.add_coach)
router.get('/:id', authorize(), coachController.get_coach_by_id)
router.delete('/:id', authorize(), coachController.delete_coach)


module.exports = router