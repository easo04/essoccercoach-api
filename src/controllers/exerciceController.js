let Exercice = require('../models/exerciceModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}
const categories_valids = ['rondo', 'offensif', 'deffensif', 'tactique', 'gardien', 'physique']

exports.get_exercice_by_id = function(req, res) {
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    Exercice.getExerciceById(req.params.id).then(exercice => {
        response.code = STATUS_RESPONSE.OK
        if(exercice){
            response.exercice = exercice
        }else{
            response.status =  'USER_NOT_FOUND'
        }
        res.json(response)
    }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
}

exports.get_exercices_by_category = function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    const category = req.params.category

    if(categories_valids.includes(category)){
        Exercice.getExercicesByCategory(category).then(exercices => {
            response = {
                code:STATUS_RESPONSE.OK,
                category:category,
                exercices:exercices
            }
            res.json(response)
        }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
    }else{
        response.message = 'Catgory not valid'
        response.status = 'CATEGORY_NOT_VALID'
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_popular_exercices = function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    Exercice.getPopularExercices().then(exercices => {
        response = {
            code:STATUS_RESPONSE.OK,
            exercices:exercices
        }
        res.json(response)
    }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
}
  
exports.list_all_exercices = function(req, res) {
    Exercice.getAllExercices().then(exercices =>{
        let response = {
            code:STATUS_RESPONSE.OK,
            exercices:exercices
        }
        res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(err =>{
        let response = {
            code:STATUS_RESPONSE.ERROR,
            status:'Error'
        }
        res.status(STATUS_RESPONSE.ERROR).json(response)
    })
}

exports.create_exercice = function(req, res) {
    let exercice = new Exercice(req.body);
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:''}

    //verify body valid
     if(!exercice.title || !exercice.description){
        response.message = 'Please provide title/description'
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }else{
        Exercice.createExercice(exercice).then(res =>{
            response = {code:STATUS_RESPONSE.OK, exercice_id:exerice}
            res.status(STATUS_RESPONSE.OK).json(response)
        }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
    }
}

exports.delete_exercice = function(req, res) {
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    Exercice.remove(req.params.id).then(res => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'exercice deleted'
        }
        res.json(response)
    }).catch(err=>res.status(STATUS_RESPONSE.ERROR).json(response))
}