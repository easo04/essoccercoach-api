
const jwt = require('express-jwt');
//const { secret } = require('config.json');
let User = require('../models/userModel.js')

module.exports = authorize;

const secret = 'ESSOCCER_COACH_KEY'

//token test eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImlhdCI6MTYxMjY0NDkxMywiZXhwIjoxNjEzMjQ5NzEzfQ.9ZLLD9gH6bU9Rs_920sn3VV0szUf3pJEMfJZ_TUXimY

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            
            // get user with id from token 'sub' (subject) property
            const user = await User.getUserById(req.user.sub);

            // check user still exists
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            // authorization successful
            req.user = user
            next();
        }
    ];
}