'user strict'
const sql = require('../database')

//User object constructor
class User {
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = user.password
        this.user_name = user.user_name
        this.subscription = user.subscription
        this.image_url = user.image_url
        this.image_id = user.image_id
        this.token = user.token
    }

    static subscribe(user){
        return new Promise((resolve, reject) =>{
            sql.query("INSERT INTO users SET ?", user, function (err, res) {       
                if(err) {
                    console.log(err)
                    reject(err)
                }
                else{
                    resolve(res.insertId)
                }
            })
        })
    }

    static getUserById(id){
        return new Promise((resolve, reject)=>{
            sql.query("SELECT * FROM users WHERE id = ?", id, function(err, res){
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }
                else{
                    let response = res[0] ? getUserFormated(res[0]) : undefined;
                    resolve(response)
                }
            })
        })
    }

    static getOne(email, pass){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM users WHERE email = ?", email, (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{
                    let response = res[0] ? getUserFormated(res[0], pass) : undefined;
                    resolve(response)
                }
            })
        })
    }

    static getAll(){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM users", (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{
                    let users = []
                    res.forEach(u => {
                        users.push(getUserFormated(u))
                    });
                    resolve(users)
                }
            })
        })
    }

    static updateToken(token, id){
        return new Promise((resolve, reject) =>{
            sql.query("UPDATE users SET token = ? WHERE id = ?", [token, id], (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    }

    static findByToken(token){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT id FROM users WHERE token = ?", token, (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{ 
                    resolve(res[0])
                }
            })
        })
    }

    static deleteToken(id){
        return new Promise((resolve, reject) =>{
            sql.query("UPDATE users SET token = '0' WHERE id = ?", id, (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{ 
                    resolve(res)
                }
            })
        })
    }
}

//formate the user string
function getUserFormated(res, pass){
    let response = {
        id:res.id,
        fist_name:res.first_name,
        last_name:res.last_name,
        user_name:res.user_name,
        email:res.email,
        created_at:res.created_at,
        image_url:res.image_url,
        subscription:res.subscription
    }

    if(pass){
        response.password = res.password
        response.token = res.token
    }

    return response
}

module.exports = User;