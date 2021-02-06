const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let User = require('../models/userModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}

exports.get_user_by_id = function(req, res) {
    User.getUserById(req.params.id, function(err, user) {
        let response = {
            code:STATUS_RESPONSE.ERROR,
            status:'Error'
        }
        if (err){
            res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        response = {
            code:STATUS_RESPONSE.OK,
            user:user
        }
        res.json(response)
    })
}
exports.subscribe = async function(req, res){
    let user = req.body;
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
     if(!user.first_name || !user.last_name || !user.email || !user.password){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
    else{

        //verify if user already exist
        try{
            const userOne = await User.getOne(user.email)
            if(userOne){
                response.message = 'user already exist'
                return res.status(STATUS_RESPONSE.ERROR).json(response)
            }else{
                // hash password
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10)
                }
    
                console.log('continue')
                
                //save the user
                let newUser = new User(user)
                User.subscribe(newUser, function(err, user_response) {
                    if (err){
                        return res.status(STATUS_RESPONSE.ERROR).json(response);
                    }
                    response = {code:STATUS_RESPONSE.OK, user_id:user_response}
                    return res.status(STATUS_RESPONSE.OK).json(response)
                })
            }
        }catch(err){
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }
       
    }
}
exports.login = async function(req, res){
    const {email, password} = req.body
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
    try{
        const userOne = await User.getOne(email)

        console.log('userOne' + userOne)

        if (!userOne || !(await bcrypt.compare(password, userOne.password))){
            response.message = 'email or password is incorrect'
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }

        // authentication successful
        const token = jwt.sign({ sub: userOne.id }, 'ESSOCCER_COACH_KEY', { expiresIn: '7d' })
        response = {code:STATUS_RESPONSE.OK, user:userOne, token: token}
        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        console.log('error' + err)
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}
exports.get_all_users = function(req, res, next){
    User.getAll()
    .then(users => res.json(users))
    .catch(next);
}
