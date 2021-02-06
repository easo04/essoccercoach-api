const express = require('express')
const router = express.Router()
const mySqlConnection = require('../database')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}

const INSERT_EXERCICE_QUERY = 'INSERT INTO exercices (title, description, disposition, objectifs, nbPlayers, ' +
                                'time, category, popular, image_url, image_id' +
                                ') VALUES (?,?,?,?,?,?,?,?,?,?);'

router.get('/', (req, res) =>{
    mySqlConnection.query('SELECT * FROM exercices', (err, rows, fields) =>{
        let response
        if(!err){
            response = {
                code:STATUS_RESPONSE.OK,
                exercices:rows
            }
        }else{
            response = {
                code:STATUS_RESPONSE.ERROR,
                status:'Error'
            }
        }

        res.json(response)
    })
})

router.post('/', (req, res) =>{
    const {title, description, disposition, objectifs, nbPlayers, time, category, popular, image_url, image_id} = req.body
    
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error'}

    console.log(req.body)
    console.log(title + '' + description)
    //title et description sont oligatoires
    if(title && description){
        mySqlConnection.query(INSERT_EXERCICE_QUERY, [title, description, disposition, objectifs,
            nbPlayers, time, category, popular, image_url, image_id], (err, rows, fields) =>{
                if(!err){
                    response = {code:STATUS_RESPONSE.OK, status:'Exercice added'}
                }else{
                    console.log(err)
                }
        })
    }

    res.json(response)
})

module.exports = router