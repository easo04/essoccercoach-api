if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const pkg = require('../package.json')

const app = express()

console.log('Mode ' + process.env.NODE_ENV)

app.set('port', process.env.PORT || 4000)
app.set('pkg', pkg)

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//route principale
app.get('/', function(req, res) {
    res.json({
        mesage:'welcome to essoccercoach rest api',
        version: app.get('pkg').version,
        name: app.get('pkg').name,
    })
})

//routes api
app.use('/api/emails', require('./routes/emails.js'))
app.use('/api/exercices', require('./routes/exercices.js'))
app.use('/api/tokens', require('./routes/tokens.js'))
app.use('/api/users', require('./routes/users.js'))

app.listen(app.get('port'), ()=>{
    console.log('server on port ' + app.get('port'))
})