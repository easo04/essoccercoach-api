const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

let teamController = require('../controllers/teamController');

//routes
router.post('/', authorize(), teamController.add_team)
router.get('/:id', authorize(), teamController.get_team_by_id)
router.delete('/:id', authorize(), teamController.delete_team)
router.get('/teams/get-summary-teams', authorize(), teamController.get_summary_teams)


module.exports = router