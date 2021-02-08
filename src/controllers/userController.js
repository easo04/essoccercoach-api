const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
let User = require('../models/userModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}

exports.get_user_by_id = function(req, res) {
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    User.getUserById(req.params.id).then((user)=>{
        console.log('succes')
        response = {
            code:STATUS_RESPONSE.OK,
            user:user
        }
        res.json(response)
    }).catch(err => {
        console.log(err)
        res.status(STATUS_RESPONSE.ERROR).json(response)
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

        try{
            
            //verify if user already exist
            const userOne = await User.getOne(user.email)
            if(userOne){
                response.message = 'user already exist'
                return res.status(STATUS_RESPONSE.ERROR).json(response)
            }

            //hash password
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10)
            }
            
            //save the user
            let newUser = new User(user)
            const userId = await User.subscribe(newUser)
            if(userId){
                response = {code:STATUS_RESPONSE.OK, message:'user subscribed'}
                return res.status(STATUS_RESPONSE.OK).json(response)
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
        const userOne = await User.getOne(email, true)
        console.log(userOne)
        if (!userOne || !(await bcrypt.compare(password, userOne.password))){
            response.message = 'email or password is incorrect'
            return res.status(STATUS_RESPONSE.ERROR).json(response)
        }

        //formate user response
        const userResponse = {
            id:userOne.id,
            fist_name:userOne.first_name,
            last_name:userOne.last_name,
            user_name:userOne.user_name,
            email:userOne.email,
            created_at:userOne.created_at,
            image_url:userOne.image_url,
            subscription:userOne.subscription
        }

        // authentication successful
        const token = jwt.sign({ sub: userOne.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        response = {code:STATUS_RESPONSE.OK, user:userResponse, token: token}
        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_all_users = function(req, res, next){
    User.getAll().then(users => {
        let response = {
            code:STATUS_RESPONSE.OK,
            users:users
        }
        res.json(response)
    }).catch(next);
}
