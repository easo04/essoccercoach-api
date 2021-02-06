let Exercice = require('../models/exerciceModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}
const categories_valids = ['rondo', 'offensif', 'deffensif', 'tactique', 'gardien', 'physique']

exports.get_exercice_by_id = function(req, res) {
    Exercice.getExerciceById(req.params.id, function(err, exercice) {
        let response = {
            code:STATUS_RESPONSE.ERROR,
            status:'Error'
        }
        if (err){
            res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        response = {
            code:STATUS_RESPONSE.OK,
            exercice:exercice
        }
        res.json(response)
    })
}

exports.get_exercices_by_category = function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    const category = req.params.category

    if(categories_valids.includes(category)){
        Exercice.getExercicesByCategory(category, function(err, exercices) {
            if (err){
                res.status(STATUS_RESPONSE.ERROR).json(response)
            }
            response = {
                code:STATUS_RESPONSE.OK,
                category:category,
                exercices:exercices
            }
            res.json(response)
        })
    }else{
        response.message = 'Catgory not valid'
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}
  
exports.list_all_exercices = function(req, res) {
    Exercice.getAllExercices(function(err, exercices) {

        let response = {
            code:STATUS_RESPONSE.OK,
            exercices:exercices
        }

        if (err){
            response = {
                code:STATUS_RESPONSE.ERROR,
                status:'Error'
            }
            res.status(STATUS_RESPONSE.ERROR).json(response)
        }
        res.status(STATUS_RESPONSE.OK).json(response)
    })
}

exports.create_exercice = function(req, res) {
    let exercice = new Exercice(req.body);
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}
  
     if(!exercice.title || !exercice.description){
        response.message = 'Please provide title/description'
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
    else{
        Exercice.createExercice(exercice, function(err, exerice) {
            if (err){
                res.status(STATUS_RESPONSE.ERROR),json(response);
            }
            response = {code:STATUS_RESPONSE.OK, exercice_id:exerice}
            res.status(STATUS_RESPONSE.OK).json(response)
        })
    }
}