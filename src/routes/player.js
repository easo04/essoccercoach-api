const express = require('express')
const authorize = require('../middleware/authorize')
const router = express.Router()

const playerController = require('../controllers/playerController');

//routes
router.post('/', authorize(), playerController.add_player)
router.get('/:id', authorize(), playerController.get_player_by_id)
router.delete('/:id', authorize(), playerController.delete_player)


module.exports = router