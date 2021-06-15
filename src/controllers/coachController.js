let Coach = require('../models/CoachModel')
let CoachDAO = require('../models/dao/CoachDAO.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_coach = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const coachDTO = req.body

    console.log('coachDTO ' + coachDTO.first_name)

    if(!validateCoachDTO(coachDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    let {first_name, last_name, role, admin, equipe} = coachDTO

    try{
        const newCoach = new Coach(first_name, last_name, role, admin, equipe)
        const coachId = await CoachDAO.createCoach(newCoach)
        if(coachId){
            response = {code:STATUS_RESPONSE.OK, message:'coach created', coachId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        console.log('error controller ' + error)
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_coach_by_id = async function(req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}

    try{
        const coach = await CoachDAO.getCoachById(req.params.id)

        response = {
            code:STATUS_RESPONSE.OK,
            coach
        }

        res.json(response)
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.delete_coach = function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
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
