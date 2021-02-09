
let User = require('../models/userModel.js')

module.exports = isLogged

async function isLogged(req, res, next){
    const id = req.user.id
    const isLogged = await User.userIsLogged(id)
    req.user.isAuth= isLogged
    next()
}