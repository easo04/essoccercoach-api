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
    this.popular = exercice.popular ? 1 : 0
    this.image_url = exercice.image_url
    this.image_id = exercice.image_id
}

//statics functions
Exercice.createExercice = function (newExercices) {    
    return new Promise((resolve, reject) =>{
        sql.query('INSERT INTO exercices set ?', newExercices, function (err, res) {       
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res.insertId)
            }
        })    
    })  
}
Exercice.getExerciceById = function (exerciceId) {
    return new Promise((resolve, reject) =>{
        sql.query("SELECT * FROM exercices WHERE id = ? ", exerciceId, function (err, res) {             
            if(err) {
                reject(err)
            }
            else{
                resolve(res[0])
            }
        })
    })
}
Exercice.getAllExercices = function() {
    return new Promise((resolve, reject) =>{
        sql.query("SELECT * FROM exercices ORDER BY created_at DESC", function (err, res) {
            if(err) {
                reject(err)
            }
            else{
                resolve(res)
            }
        });   
    })
}
Exercice.getPopularExercices = function() {
    return new Promise((resolve, reject) =>{
        sql.query("SELECT * FROM exercices WHERE popular = 1 ORDER BY created_at DESC", function (err, res) {
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        }) 
    })  
}
Exercice.getExercicesByCategory = function(category){
    return new Promise((resolve, reject) =>{
        sql.query("SELECT * FROM exercices WHERE category = ? ORDER BY created_at DESC", category, function (err, res) {             
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}
Exercice.remove = function (id){
    return new Promise((resolve, reject) =>{
        sql.query("DELETE FROM exercices WHERE id = ?", [id], function (err, res) {
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}
Exercice.updatePopular = function(id, value){
    return new Promise((resolve, reject) =>{
        sql.query("UPDATE exercices SET popular = ? WHERE id = ?", [value, id], function (err, res) {
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}
Exercice.getSameCategory = function(category, id){
    return new Promise((resolve, reject) =>{
        sql.query("SELECT * FROM exercices WHERE category = ? AND id <> ? ORDER BY RAND () LIMIT 4", [category, id], function (err, res) {
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}
Exercice.updateExercice = function(exercice){
    return new Promise((resolve, reject) =>{
        sql.query("UPDATE exercices SET title = ?, description = ?, objectifs = ?, disposition = ?,  nbPlayers = ?, category = ? WHERE id = ?", 
            [exercice.title, exercice.description, exercice.objectifs, exercice.disposition, exercice.nbPlayers, exercice.category, exercice.id], function (err, res) {
            if(err) {
                console.log("error: ", err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

module.exports = Exercice;