const Alignement = require("../models/AlignementModel")
const AlignementDAO = require("../models/dao/AlignementDAO")
const { StatusResponse } = require("../models/StatusResponse")

exports.add_alignement = async function (req, res){
    let response = {code:StatusResponse.ERROR, status:'Error', message:'error'}
    const alignementDTO = req.body

    if(!validateDTO(alignementDTO)){
        response.message = 'DTO invalid'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        const newAlignement = new Alignement(alignementDTO)
        const alignementId = await AlignementDAO.createAlignement(newAlignement)
        if(alignementId){
            response = {code:StatusResponse.OK, message:'alignement created', alignementId}
            return res.status(StatusResponse.OK).json(response)
        }
    }catch(error){
        return res.status(StatusResponse.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.update_alignement = async function (req, res){
    let response = {code:StatusResponse.ERROR, status:'Error', message:'error'}
    const alignementDTO = req.body

    if(!validateDTO(alignementDTO)){
        response.message = 'DTO invalid'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        const newAlignement = new Alignement(alignementDTO)
        const alignementId = await AlignementDAO.updateAlignement(newAlignement)
        if(alignementId){
            response = {code:StatusResponse.OK, message:'alignement updated', alignementId}
            return res.status(StatusResponse.OK).json(response)
        }
    }catch(error){
        return res.status(StatusResponse.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_alignement_by_id = async function(req, res){

    try{
        const alignement = await AlignementDAO.getAlignementById(req.params.id)

        if(!activity){
            return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'NOT FOUND'})
        }

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,alignement})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }
}

exports.get_alignement_by_activity = async function(req, res){

    try{
        const alignement = await AlignementDAO.getAlignementByActivity(req.params.id)

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,alignement})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }

    
}

exports.delete_alignement = async function(req, res){
    let response = {
        code:StatusResponse.ERROR,
        status:'Error'
    }

    AlignementDAO.deleteAlignementById(req.params.id).then(() => {
        response = {
            code:StatusResponse.OK,
            message:'alignement deleted'
        }
        return res.status(StatusResponse.OK).json(response)
    }).catch(()=>res.status(StatusResponse.ERROR).json(response))
}

function validateDTO(alignementDTO){
    return alignementDTO.activite && alignementDTO.defenseurs && alignementDTO.milieux && alignementDTO.attaquants &&
            alignementDTO.gardien
}