const mysql = require('mysql')

const mySqlConnection = mysql.createPool({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    password:process.env.PASSWORD_DB,
    port:process.env.PORT_DB,
    database:process.env.DATABASE_DB
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
