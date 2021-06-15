
const jwt = require('express-jwt')
let UserDAO = require('../models/dao/UserDAO')

module.exports = authorize

const secret = process.env.SECRET_KEY

const ADMIN_SUBSCRIPTION = 'admin'

const ERROR_CODE_FORBIDDEN = 403

function authorize(admin) {
    return [

        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            
            // get user with id from token 'sub' (subject) property
            const user = await UserDAO.getUserById(req.user.sub)

            // check user still exists
            if (!user){
                return res.status(ERROR_CODE_FORBIDDEN).json({ code: ERROR_CODE_FORBIDDEN, message: 'Unauthorized' })
            }
            
            //check if user has to be admin
            if(admin && user.subscription !== ADMIN_SUBSCRIPTION){
                return res.status(ERROR_CODE_FORBIDDEN).json({ code: ERROR_CODE_FORBIDDEN, message: 'not admin' })
            }

            // authorization successful
            req.user = user
            next()
        }
    ];
}