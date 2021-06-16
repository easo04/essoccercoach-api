const Coach = require('../models/CoachModel')
const CoachDAO = require('../models/dao/CoachDAO.js')
const UserService = require('../services/UserService')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_coach = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const coachDTO = req.body

    if(!validateCoachDTO(coachDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    const isAdminOfTeam = await CoachDAO.isAdminOfTeam(coachDTO.equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    const {first_name, last_name, role, admin, equipe} = coachDTO

    try{
        const newCoach = new Coach(first_name, last_name, role, admin, equipe)
        const coachId = await CoachDAO.createCoach(newCoach)
        if(coachId){
            response = {code:STATUS_RESPONSE.OK, message:'coach created', coachId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_coach_by_id = async function(req, res){

    try{
        const coach = await CoachDAO.getCoachById(req.params.id)

        if(coach){
            const canUserReadTeam = await UserService.userCanReadATeam(req.user.id, coach.equipe)
            if(!canUserReadTeam){
                return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'Acces denied'})
            }
        }
        
        res.json({code:STATUS_RESPONSE.OK,coach})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

exports.delete_coach = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    /*const isAdminOfTeam = await CoachDAO.isAdminOfTeam(equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }*/

    CoachDAO.deleteCoachById(req.params.id).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'coach deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(()=>res.status(STATUS_RESPONSE.ERROR).json(response))
}

/*functions controller*/
function validateCoachDTO(coachDTO){
    return coachDTO.first_name && coachDTO.last_name && coachDTO.role && coachDTO.equipe; 
}
