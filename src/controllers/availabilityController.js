const Availability = require('../models/AvailabilityModel.js')
const AvailabilityDAO = require('../models/dao/AvailabilityDAO.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_availability = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const availabilityDTO = req.body

    if(!validateAvailabilityDTO(availabilityDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        const newAvailability = new Availability(availabilityDTO)
        const availabilityId = await AvailabilityDAO.createAvailability(newAvailability)
        if(availabilityId){
            response = {code:STATUS_RESPONSE.OK, message:'activity created', availabilityId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.update_availability = async function(req, res){
    
}

exports.get_availability_by_id = async function(req, res){

    try{
        const availability = await AvailabilityDAO.getAvailabilityById(req.params.id)

        return res.status(STATUS_RESPONSE.OK).json({code:STATUS_RESPONSE.OK,availability})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

exports.get_availabilities_by_activity = async function(req, res){

    try{
        const availabilities = await AvailabilityDAO.getAllAvailabilityByActivity(req.params.id)

        return res.status(STATUS_RESPONSE.OK).json({code:STATUS_RESPONSE.OK,availabilities})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

exports.delete_availability = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    AvailabilityDAO.deleteAvailabilityById(req.params.id).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'availability deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(()=>res.status(STATUS_RESPONSE.ERROR).json(response))
}

/*functions controller*/
function validateAvailabilityDTO(availabilityDTO){
    return availabilityDTO.present && availabilityDTO.joueur && availabilityDTO.activite
}
