const express = require('express')
const router = express.Router()

let tokenController = require('../controllers/tokenController');

router.post('/generate-token', tokenController.generate_token)
router.get('/', tokenController.get_all_tokens)

module.exports = router