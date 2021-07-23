const { StatusResponse } = require("../models/StatusResponse")
const SeanceService = require("../services/SeanceService")

exports.add_seance = async function (req, res){
    let response = {code:StatusResponse.ERROR, status:'Error', message:'error'}
    const seanceDTO = req.body

    if(!validateDTO(seanceDTO)){
        response.message = 'DTO invalid'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{

        const seanceId = await SeanceService.createSeance(seanceDTO)
        if(seanceId){
            response = {code:StatusResponse.OK, message:'seance created', seanceId}
            return res.status(StatusResponse.OK).json(response)
        }
    }catch(error){
        return res.status(StatusResponse.ERROR).json(response)
    }

    return res.status(StatusResponse.ERROR).json(response)
}

exports.update_seance = async function (req, res){
    let response = {code:StatusResponse.ERROR, status:'Error', message:'error'}
    const seanceDTO = req.body

    if(!validateDTO(seanceDTO)){
        response.message = 'DTO invalid'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        const seance = new Seance(seanceDTO)
        const seanceId = await SeanceService.updateSeance(seance)
        if(seanceId){
            response = {code:StatusResponse.OK, message:'seance updated', seanceId}
            return res.status(StatusResponse.OK).json(response)
        }
    }catch(error){
        return res.status(StatusResponse.ERROR).json(response)
    }

    return res.status(StatusResponse.ERROR).json(response)
}

exports.get_seance_by_id = async function(req, res){

    try{
        const seance = await SeanceService.getSeanceById(req.params.id)

        if(!seance){
            return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'NOT FOUND'})
        }

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,seance})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }
}

exports.get_seance_by_activity = async function(req, res){

    try{
        const seance = await SeanceService.getSeanceByActivity(req.params.id)

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,seance})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }

    
}

exports.delete_seance = async function(req, res){
    let response = {
        code:StatusResponse.ERROR,
        status:'Error'
    }

    SeanceService.deleteSeance(req.params.id).then(() => {
        response = {
            code:StatusResponse.OK,
            message:'seance deleted'
        }
        return res.status(StatusResponse.OK).json(response)
    }).catch(()=>res.status(StatusResponse.ERROR).json(response))
}

function validateDTO(seanceDTO){
    return seanceDTO.theme && seanceDTO.activite && seanceDTO.exercices
}