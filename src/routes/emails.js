const express = require('express')
const router = express.Router()
const mySqlConnection = require('../database')

router.get('/', (req, res) =>{
    mySqlConnection.query('SELECT * FROM emails', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        }else{
            console.log('erreur lors de la récupération des emails')
        }
    })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params
    mySqlConnection.query('SELECT * FROM emails WHERE ID = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err)
        }
    })
})

router.post('/', (req, res) =>{
    let {id, email} = req.body
    console.log(id)
    id = id || 0
    console.log(id)
    const query = 'CALL emailsAddOrEdit(?, ?);'
    mySqlConnection.query(query, [id, email], (err, rows, fields) =>{
        if(!err){
            res.json({
                status:'email saved',
                code:'200',
            })
        }else{
            console.log(err)
            res.json({
                status:'error',
                code:'400',
            })
        }
    })
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    mySqlConnection.query('DELETE FROM emails WHERE ID = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({
                status:'email deleted',
                code:'200',
            })
        }else{
            console.log(err)
            res.json({
                status:'error',
                code:'400',
            })
        }
    })
})

module.exports = router