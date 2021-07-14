const Availability = require('../models/AvailabilityModel.js')
const AvailabilityDAO = require('../models/dao/AvailabilityDAO.js')
const ActivityDAO = require('../models/dao/ActivityDAO')
const TeamDAO = require('../models/dao/TeamDAO')
const PlayerDAO = require('../models/dao/PlayerDAO.js')

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

exports.update_availability = function(req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const availabilityDTO = req.body

    if(availabilityDTO.id === undefined || availabilityDTO.present === undefined){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    AvailabilityDAO.updateAvailability(availabilityDTO).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'availability updated'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(()=>res.status(STATUS_RESPONSE.ERROR).json(response))

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
        const activity = await ActivityDAO.getActivityById(req.params.id)

        const players = await PlayerDAO.getAllPlayersByTeam(activity.equipe)

        let availabilities = []

        for(let i=0;i<players.length;i++){
            const availability = await AvailabilityDAO.getAvailabilityByPlayerAndActivity(players[i].id, activity.id)
            availabilities.push({
                'availability' : availability ? availability.present : false,
                'name_player' : players[i].first_name + ' ' + players[i].last_name,
                'id_player' : players[i].id,
                'id_availability' : availability ? availability.id : null
            })
        }

        return res.status(STATUS_RESPONSE.OK).json({code:STATUS_RESPONSE.OK,availabilities})
    }catch(error){
        console.log(error)
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
