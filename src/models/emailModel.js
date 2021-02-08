'user strict'
const sql = require('../database')

//User object constructor
class Email {
    constructor(email){
        this.email = email
    }

    static add(email){
        console.log(email)
        return new Promise((resolve, reject) =>{
            sql.query("INSERT INTO emails SET ?", email, function (err, res) {       
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

    static getEmailById(id){
        return new Promise((resolve, reject)=>{
            sql.query("SELECT * FROM emails WHERE id = ?", id, function(err, res){
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }
                else{
                    resolve(res[0])
                }
            })
        })
    }

    static getAll(){
        return new Promise((resolve, reject) =>{
            sql.query("SELECT * FROM emails ORDER BY created_at DESC", (err, res)=>{
                if(err) {
                    console.log("error: ", err)
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    }

    static delete(id){
        new Promise((resolve, reject) =>{
            sql.query("DELETE FROM emails WHERE id = ?", id, (err, res)=>{
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

module.exports = Email;