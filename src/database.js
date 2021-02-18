const mysql = require('mysql')

/*const mySqlConnection = mysql.createConnection({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    password:process.env.PASSWORD_DB,
    port:process.env.PORT_DB,
    database:process.env.DATABASE_DB
})*/

var mySqlConnection = mysql.createPool({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    password:process.env.PASSWORD_DB,
    port:process.env.PORT_DB,
    database:process.env.DATABASE_DB
})

// Attempt to catch disconnects 
mySqlConnection.on('connection', function (connection) {
    console.log('DB Connection established')

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    })
    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    })

})

/*mySqlConnection.connect((err) =>{
    if(err){
        console.log(err)
        return
    }else{
        console.log('database connected')
    }
})*/

module.exports = mySqlConnection
