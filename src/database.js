const mysql = require('mysql')

const mySqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Silvera1993!',
    port:'3306',
    database:'essoccercoach'
})

mySqlConnection.connect((err) =>{
    if(err){
        console.log(err)
        return
    }else{
        console.log('database connected')
    }
})

module.exports = mySqlConnection
