const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let User = require('../models/userModel.js')
let UserDAO = require('../models/dao/UserDAO')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

const TOKEN_INVALID = "0"

exports.get_user_by_id = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    UserDAO.getUserById(req.params.id).then((user)=>{
        response = {
            code:STATUS_RESPONSE.OK,
            user:user
        }
        res.json(response)
    }).catch(err => {
        res.status(STATUS_RESPONSE.ERROR).json(response)
    })
}

exports.subscribe = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}

    if(!user.first_name || !user.last_name || !user.email || !user.password){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        
        //verify if user already exist
        const userOne = await UserDAO.getOne(user.email)
        if(userOne){
            response.message = 'user already exist'
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }

        //if subscription admin, subscription free default
        if(user.subscription === 'admin'){
            user.subscription = 'free'
        }

        //hash password
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        
        //save the user
        let newUser = new User(user)
        const userId = await UserDAO.subscribe(newUser)
        if(userId){
            response = {code:STATUS_RESPONSE.OK, message:'user subscribed'}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }

    }catch(err){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.subscribeByAdmin = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
    if(!user.first_name || !user.last_name || !user.email){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }else{

        try{
            
            //verify if user already exist
            const userOne = await UserDAO.getOne(user.email)
            if(userOne){
                response.message = 'user already exist'
                return res.status(STATUS_RESPONSE.ERROR).json(response)
            }

            //if subscription undefined, free default
            if(!user.subscription){
                user.subscription = 'free'
            }

            //hash password
            user.password = 'Bonjour123'
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10)
            }
            
            //save the user
            let newUser = new User(user)
            const userId = await UserDAO.subscribe(newUser)
            if(userId){
                response = {code:STATUS_RESPONSE.OK, message:'user subscribed'}
                return res.status(STATUS_RESPONSE.OK).json(response)
            }

        }catch(err){
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }
    }
}

exports.update = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
    
    if(!user.first_name || !user.last_name || !user.email){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
    
    try{
        
        //verify if user already exist
        const userOne = await UserDAO.getOne(user.email)
        if(!userOne){
            response.message = 'user not exist'
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        
        //save the user
        let newUser = new User(user)
        newUser.id = user.id;
        const userId = await UserDAO.update(newUser)
        if(userId){
            response = {code:STATUS_RESPONSE.OK, message:'user updated'}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }

    }catch(err){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.login = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")

    const {email, password} = req.body
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
    try{
        const userOne = await UserDAO.getOne(email, true)
        if (!userOne || !(await bcrypt.compare(password, userOne.password))){
            response.status = 'EMAIL_PASSWORD_INCORRECT'
            response.message = 'email or password is incorrect'
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }

        //verify if user is already logged
        if(userOne.token && userOne.token !== TOKEN_INVALID){
            //response.status = 'ALREADY_LOGGED'
            //response.message = 'user already logged'
            UserDAO.deleteToken(userOne.id)
            //return res.status(STATUS_RESPONSE.ALREADY_LOGGED).json(response)
        }

        //formate user response
        const userResponse = {
            id:userOne.id,
            first_name:userOne.first_name,
            last_name:userOne.last_name,
            user_name:userOne.user_name,
            email:userOne.email,
            created_at:userOne.created_at,
            image_url:userOne.image_url,
            subscription:userOne.subscription
        }

        // authentication successful
        const token = jwt.sign({ sub: userOne.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        await UserDAO.updateToken(token, userOne.id)
        response = {code:STATUS_RESPONSE.OK, user:userResponse, token: token}
        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_all_users = function(req, res, next){
    UserDAO.getAll().then(users => {
        let response = {
            code:STATUS_RESPONSE.OK,
            users:users
        }
        res.json(response)
    }).catch(next);
}

exports.logout = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'error'
    }
    try{
        await UserDAO.deleteToken(req.user.id)
        response.code = STATUS_RESPONSE.OK
        response.status = 'logout'
        res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.updatePassword = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'error'
    }
    
    let {oldPassword, newPassword, email} = req.body;

    if(oldPassword === newPassword){
        response.status = 'PASSWORD_ERROR'
        response.message = 'password error'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    const userOne = await UserDAO.getOne(email, true)
    if (!userOne || !(await bcrypt.compare(oldPassword, userOne.password))){
        response.status = 'EMAIL_PASSWORD_INCORRECT'
        response.message = 'email or password is incorrect'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        newPassword = await bcrypt.hash(newPassword, 10)
        await UserDAO.updatePassword(userOne.id, newPassword)
        response.code = STATUS_RESPONSE.OK
        response.status = 'updated'
        response.message = 'password updated'
        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}
