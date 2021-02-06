'user strict'
const sql = require('../database')

//Token object constructor
class Token {
    constructor(){}

    static generateToken(token, result){
        sql.query("INSERT INTO tokens (token) VALUES(?)", [token], function (err, res) {       
            if(err) {
                result(err, null)
            }
            else{
                result(null, res.insertId)
            }
        })    
    }

    static getAllTokens(result){
        sql.query("SELECT * FROM tokens", function(err, res){
            if(err) {
                console.log("error: ", err)
                result(null, err)
            }
            else{
                result(null, res)
            }
        })
    }
}

module.exports = Token;