const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let User = require('../models/userModel.js')
let UserDAO = require('../models/dao/UserDAO');
const UserService = require('../services/UserService.js');
const { StatusResponse } = require('../models/StatusResponse.js');

const TOKEN_INVALID = "0"

exports.get_user_by_id = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    let response = {
        code:StatusResponse.ERROR,
        status:'Error'
    }
    UserDAO.getUserById(req.params.id).then((user)=>{
        response = {
            code:StatusResponse.OK,
            user:user
        }
        res.json(response)
    }).catch(err => {
        res.status(StatusResponse.ERROR).json(response)
    })
}

exports.subscribe = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:StatusResponse.ERROR, status:'Error', message:''}

    if(!user.first_name || !user.last_name || !user.email || !user.password){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        
        //verify if user already exist
        const userOne = await UserDAO.getOne(user.email)
        if(userOne){
            response.message = 'user already exist'
            return res.status(StatusResponse.ERROR).json(response)
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
            response = {code:StatusResponse.OK, message:'user subscribed'}
            return res.status(StatusResponse.OK).json(response)
        }

    }catch(err){
        return res.status(StatusResponse.ERROR).json(response)
    }
}

exports.subscribeByAdmin = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:StatusResponse.ERROR, status:'Error', message:''}
    if(!user.first_name || !user.last_name || !user.email){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(StatusResponse.ERROR).json(response)
    }else{

        try{
            
            //verify if user already exist
            const userOne = await UserDAO.getOne(user.email)
            if(userOne){
                response.message = 'user already exist'
                return res.status(StatusResponse.ERROR).json(response)
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
                response = {code:StatusResponse.OK, message:'user subscribed'}
                return res.status(StatusResponse.OK).json(response)
            }

        }catch(err){
            return res.status(StatusResponse.ERROR).json(response)
        }
    }
}

exports.update = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    let user = req.body;
    let response = {code:StatusResponse.ERROR, status:'Error', message:''}
    
    if(!user.first_name || !user.last_name || !user.email){
        response.message = 'Please provide firts_name/last_name/email/password'
        return res.status(StatusResponse.ERROR).json(response)
    }
    
    try{
        
        //verify if user already exist
        const userOne = await UserDAO.getOne(user.email)
        if(!userOne){
            response.message = 'user not exist'
            return res.status(StatusResponse.ERROR).json(response)
        }
        
        //save the user
        let newUser = new User(user)
        newUser.id = user.id;
        const userId = await UserDAO.update(newUser)
        if(userId){
            response = {code:StatusResponse.OK, message:'user updated'}
            return res.status(StatusResponse.OK).json(response)
        }

    }catch(err){
        return res.status(StatusResponse.ERROR).json(response)
    }
}

exports.login = async function(req, res){
    res.header("Access-Control-Allow-Origin", "*")

    const {email, password} = req.body
    let response = {code:StatusResponse.ERROR, status:'Error', message:''}
    try{
        const userOne = await UserDAO.getOne(email, true)
        if (!userOne || !(await bcrypt.compare(password, userOne.password))){
            response.status = 'EMAIL_PASSWORD_INCORRECT'
            response.message = 'email or password is incorrect'
            return res.status(StatusResponse.ERROR).json(response)
        }

        const token = await getUserToken(userOne)
        
        const userResponse = await UserService.getUserDetailsDTO(userOne)

        response = {code:StatusResponse.OK, user:userResponse, token: token}
        return res.status(StatusResponse.OK).json(response)
    }catch(err){
        console.log(err)
        return res.status(StatusResponse.ERROR).json(response)
    }
}

exports.get_all_users = function(req, res, next){
    UserDAO.getAll().then(users => {
        let response = {
            code:StatusResponse.OK,
            users:users
        }
        res.json(response)
    }).catch(next);
}

exports.logout = async function(req, res){
    let response = {
        code:StatusResponse.ERROR,
        status:'error'
    }
    try{
        await UserDAO.deleteToken(req.user.id)
        response.code = StatusResponse.OK
        response.status = 'logout'
        res.status(StatusResponse.OK).json(response)
    }catch(err){
        res.status(StatusResponse.ERROR).json(response)
    }
}

exports.updatePassword = async function(req, res){
    let response = {
        code:StatusResponse.ERROR,
        status:'error'
    }
    
    let {oldPassword, newPassword, email} = req.body;

    if(oldPassword === newPassword){
        response.status = 'PASSWORD_ERROR'
        response.message = 'password error'
        return res.status(StatusResponse.ERROR).json(response)
    }

    const userOne = await UserDAO.getOne(email, true)
    if (!userOne || !(await bcrypt.compare(oldPassword, userOne.password))){
        response.status = 'EMAIL_PASSWORD_INCORRECT'
        response.message = 'email or password is incorrect'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        newPassword = await bcrypt.hash(newPassword, 10)
        await UserDAO.updatePassword(userOne.id, newPassword)
        response.code = StatusResponse.OK
        response.status = 'updated'
        response.message = 'password updated'
        return res.status(StatusResponse.OK).json(response)
    }catch(err){
        return res.status(StatusResponse.ERROR).json(response)
    }
}

async function getUserToken(user){
    if(user.token && user.token !== TOKEN_INVALID){
        //response.status = 'ALREADY_LOGGED'
        //response.message = 'user already logged'
        UserDAO.deleteToken(user.id)
        //return res.status(STATUS_RESPONSE.ALREADY_LOGGED).json(response)
    }

    const token = jwt.sign({ sub:user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
    await UserDAO.updateToken(token, user.id)

    return token
}