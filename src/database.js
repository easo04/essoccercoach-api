const mysql = require('mysql')
const config = require('../config.json')

const mySqlConnection = mysql.createConnection({
    host:config.db_config.host,
    user:config.db_config.user,
    password:config.db_config.password,
    port:config.db_config.port,
    database:config.db_config.database
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
