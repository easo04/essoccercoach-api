const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let teamController = require('../controllers/teamController');

//routes
router.post('/', authorize(), teamController.add_team)
router.get('/:id', teamController.get_team_by_id)


module.exports = router