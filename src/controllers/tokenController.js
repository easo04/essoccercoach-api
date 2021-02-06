let Token = require('../models/tokenModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}

exports.generate_token = function(req, res) {
    Token.generateToken(generateRandomToken(), function(err, resp) {
        let response = {
            code:STATUS_RESPONSE.ERROR,
            status:'Error'
        }
        if (err){
            res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        response = {
            code:STATUS_RESPONSE.OK,
            message:'token generated'
        }
        res.json(response)
    })
}

exports.get_all_tokens = function(req, res) {
    Token.getAllTokens(function(err, tokens) {
        let response = {
            code:STATUS_RESPONSE.ERROR,
            status:'Error'
        }
        if (err){
            res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        response = {
            code:STATUS_RESPONSE.OK,
            tokens:tokens
        }
        res.json(response)
    })
}

function generateRandomToken(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}