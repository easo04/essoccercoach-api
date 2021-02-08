if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const errorHandler = require('./middleware/error-handler')

const app = express()

console.log('Mode ' + process.env.NODE_ENV)

app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(errorHandler);

//routes api
app.use('/api/emails', require('./routes/emails.js'))
app.use('/api/exercices', require('./routes/exercices.js'))
app.use('/api/tokens', require('./routes/tokens.js'))
app.use('/api/users', require('./routes/users.js'))

app.listen(app.get('port'), ()=>{
    console.log('server on port ' + app.get('port'))
})