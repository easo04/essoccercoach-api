
const jwt = require('express-jwt');
let User = require('../models/userModel.js')

module.exports = authorize

const secret = process.env.SECRET_KEY

const ADMIN_SUBSCRIPTION = 'admin'

const ERROR_CODE_FORBIDDEN = 403

//token free eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImlhdCI6MTYxMjgxMzkzMiwiZXhwIjoxNjEzNDE4NzMyfQ.K_PoiDFxiybCyZ9eHC1V0pRE_DDIYT7xMO56EoafWvA
//token admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImlhdCI6MTYxMjY0NDkxMywiZXhwIjoxNjEzMjQ5NzEzfQ.9ZLLD9gH6bU9Rs_920sn3VV0szUf3pJEMfJZ_TUXimY

function authorize(admin) {
    return [

        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            
            // get user with id from token 'sub' (subject) property
            const user = await User.getUserById(req.user.sub)

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