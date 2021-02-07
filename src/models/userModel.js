'user strict'
const sql = require('../database')

//User object constructor
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
                    resolve(getUserFormated(res[0]))
                }
            })
        })
    }

    static getOne(email){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM users WHERE email = ?", email, (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{
                    resolve(getUserFormated(res[0]))
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
}

//formate the user string
function getUserFormated(res){
    console.log('formated')
    return {
        id:res.id,
        fist_name:res.first_name,
        last_name:res.last_name,
        user_name:res.user_name,
        email:res.email,
        created_at:res.created_at,
        image_url:res.image_url,
        subscription:res.subscription
    }
}

module.exports = User;