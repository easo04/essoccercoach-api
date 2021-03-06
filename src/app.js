const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//routes
app.use('/api/emails', require('./routes/emails.js'))

app.listen(app.get('port'), ()=>{
    console.log('server on port' + app.get('port'))
})