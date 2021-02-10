const redis = require('redis')
let Exercice = require('../models/exerciceModel.js')

let client
if(process.env.NODE_ENV === 'production'){
    client = redis.createClient(process.env.REDIS_URL);
}else{

    // create and connect redis client to local instance.
    client = redis.createClient();
}

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
    res.header("Access-Control-Allow-Origin", "*");
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    const category = req.params.category
    if(categories_valids.includes(category)){
        
        // Try fetching the result from Redis first in case we have it cached
        return client.get(`get-category:${category}`, (err, result) => {

            // If that key exist in Redis store
            if (result) {
                const resultJSON = JSON.parse(result);
                return res.status(200).json(resultJSON);
            } else { 
                Exercice.getExercicesByCategory(category).then(exercices => {
                    response = {
                        code:STATUS_RESPONSE.OK,
                        category:category,
                        exercices:exercices
                    }

                    if(exercices.length > 0){
                        
                        //set client redis cache to 60min
                        client.setex(`get-category:${category}`, 3600, JSON.stringify({ source: 'Redis Cache', ...response, }));
                    }
                    res.json(response)
                }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))    
            }
        })
    }else{
        response.message = 'Catgory not valid'
        response.status = 'CATEGORY_NOT_VALID'
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_popular_exercices = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    
    // Try fetching the result from Redis first in case we have it cached
    return client.get(`get-popular-exercices`, (err, result) => {

          // If that key exist in Redis store
        if (result) {

            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else { 

            let response = {
                code:STATUS_RESPONSE.ERROR,
                status:'Error'
            }

            Exercice.getPopularExercices().then(exercices => {
                response = {
                    code:STATUS_RESPONSE.OK,
                    exercices:exercices
                }

                if(exercices.length > 0){

                    //set client redis cache to 60min
                    client.setex(`get-popular-exercices`, 3600, JSON.stringify({ source: 'Redis Cache', ...response, }));
                }
                return res.status(STATUS_RESPONSE.OK).json(response)
            }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
        }
    })
}

exports.list_all_exercices = function(req, res) {
    
    res.header("Access-Control-Allow-Origin", "*");
    
    // Try fetching the result from Redis first in case we have it cached
    return client.get(`get-all-exercices`, (err, result) => {

        // If that key exist in Redis store
        if (result) {

            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else { 

            // Key does not exist in Redis store
            // Fetch directly from db
            Exercice.getAllExercices().then(exercices =>{
                let response = {
                    code:STATUS_RESPONSE.OK,
                    exercices:exercices
                }

                if(exercices.length > 0){

                     //set client redis cache to 60min
                    client.setex(`get-all-exercices`, 3600, JSON.stringify({ source: 'Redis Cache', ...response, }));
                }
                
                return res.status(STATUS_RESPONSE.OK).json(response)
            }).catch(err =>{
                let response = {
                    code:STATUS_RESPONSE.ERROR,
                    status:'Error'
                }
                return res.status(STATUS_RESPONSE.ERROR).json(response)
            })
        }
    })

    /*Exercice.getAllExercices().then(exercices =>{
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
    })*/
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