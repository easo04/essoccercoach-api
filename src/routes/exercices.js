const express = require('express')
const router = express.Router()
const mySqlConnection = require('../database')

let exerciceController = require('../controllers/exerciceController');

const INSERT_EXERCICE_QUERY = 'INSERT INTO exercices (title, description, disposition, objectifs, nbPlayers, ' +
                                'time, category, popular, image_url, image_id' +
                                ') VALUES (?,?,?,?,?,?,?,?,?,?);'

router.get('/', exerciceController.list_all_exercices)
router.get('/:id', exerciceController.get_exercice_by_id)
router.get('/category/:category', exerciceController.get_exercices_by_category)
router.post('/', exerciceController.create_exercice)
router.delete('/:id', exerciceController.delete_exercice)

/*(req, res) =>{
    const {title, description, disposition, objectifs, nbPlayers, time, category, popular, image_url, image_id} = req.body
    
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error'}


    //title et description sont oligatoires
    if(title && description){
        mySqlConnection.query(INSERT_EXERCICE_QUERY, [title, description, disposition, objectifs,
            nbPlayers, time, category, popular, image_url, image_id], (err, rows, fields) =>{
                if(!err){
                    response = {code:STATUS_RESPONSE.OK, status:'Exercice added'}
                }else{
                    console.log(err)
                }
                res.json(response)
        })
    }
})*/

module.exports = router