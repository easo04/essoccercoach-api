'user strict'
const sql = require('../database')

//Exercice object constructor
let Exercice = function (exercice){
    this.title = exercice.title
    this.description = exercice.description
    this.disposition = exercice.disposition
    this.objectifs = exercice.objectifs
    this.nbPlayers = exercice.nbPlayers
    this.time = exercice.time
    this.category = exercice.category
    this.popular = exercice.popular
    this.image_url = exercice.image_url
    this.image_id = exercice.image_id
}

//statics functions
Exercice.createExercice = function (newExercices, result) {    
    sql.query('INSERT INTO exercices set ?', newExercices, function (err, res) {       
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            result(null, res.insertId)
        }
    })      
}
Exercice.getExerciceById = function (exerciceId, result) {
    sql.query("SELECT * FROM exercices WHERE id = ? ", exerciceId, function (err, res) {             
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            result(null, res[0])
        }
    })
}
Exercice.getAllExercices = function(result) {
    sql.query("SELECT * FROM exercices ORDER BY created_at DESC", function (err, res) {
        if(err) {
            console.log("error: ", err)
            result(null, err)
        }
        else{
            result(null, res)
        }
    });   
}
Exercice.getExercicesByCategory = function(category, result){
    sql.query("SELECT * FROM exercices WHERE category = ? ORDER BY created_at DESC", category, function (err, res) {             
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}
Exercice.remove = function (id, result){
    sql.query("DELETE FROM exercices WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err)
            result(null, err)
        }
        else{
        
            result(null, res)
        }
    })
}

module.exports = Exercice;