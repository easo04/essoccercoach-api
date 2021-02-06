'user strict'
const { urlencoded } = require('body-parser')
const sql = require('../database')

//Token object constructor
class User {
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email,
        this.password = user.password
        this.user_name = user.user_name
        this.subscription = user.subscription
        this.image_url = user.image_url
        this.image_id = user.image_id
    }

    static subscribe(user, result){
        console.log('subscribe')
        sql.query("INSERT INTO users SET ?", user, function (err, res) {       
            if(err) {
                console.log(err)
                result(err, null)
            }
            else{
                result(null, res.insertId)
            }
        })    
    }

    static getUserById(id){
        return new Promise((resolve, reject)=>{
            sql.query("SELECT * FROM users WHERE id = ?", id, function(err, res){
                if(err) {
                    console.log("error: ", err)
                    return reject(err)
                }
                else{
                    let response = {
                        id:res[0].id,
                        first_name:res[0].first_name,
                        last_name:res[0].last_name,
                        email:res[0].email,
                        user_name:res[0].user_name,
                        subscription:res[0].subscription,
                        image_url:res[0].image_url,
                        image_id:res[0].image_id,
                        created_at:res[0].created_at
                    }
                    return resolve(response)
                }
            })
        })
    }

    static getUserByEmail(email, result){
        sql.query("SELECT * FROM users WHERE email = ?", email, function(err, res){
            if(err) {
                console.log("error: ", err)
                result(null, err)
            }
            else{
                const response = this.getUserFormated(res)
                result(null, response)
            }
        })
    }

    static getOne(email){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM users WHERE email = ?", email, (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    return reject(err)
                }else{
                    let response = {
                        id:res[0].id,
                        first_name:res[0].first_name,
                        last_name:res[0].last_name,
                        email:res[0].email,
                        user_name:res[0].user_name,
                        subscription:res[0].subscription,
                        image_url:res[0].image_url,
                        image_id:res[0].image_id,
                        created_at:res[0].created_at
                    }
                    return resolve(response)
                }
            })
        })
    }

    static getAll(){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM users", (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    return reject(err)
                }else{
                    let users = []
                    res.forEach(u => {
                        const user = {
                            id:u.id,
                            first_name:u.first_name,
                            last_name:u.last_name,
                            email:u.email,
                            user_name:u.user_name,
                            subscription:u.subscription,
                            image_url:u.image_url,
                            image_id:u.image_id,
                            created_at:u.created_at
                        }
                        users.push(user)
                    });
                    return resolve(users)
                }
            })
        })
    }

    getUserFormated(res){
        return {
            id:res.id,
            fist_name:res.fist_name,
            last_name:res.last_name,
            user_name:res.user_name,
            email:res.email,
            created_at:res.created_at,
            image_url:res.image_url
        }
    }
}

module.exports = User;