const Activity = require('../models/ActivityModel')
const ActivityDAO = require('../models/dao/ActivityDAO')
const CoachDAO = require('../models/dao/CoachDAO.js')
const UserService = require('../services/UserService')
const ActivityService = require('../services/ActivityService')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_activity = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const activityDTO = req.body

    if(!validateActivityDTO(activityDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    const isAdminOfTeam = await CoachDAO.isAdminOfTeam(activityDTO.equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        const newActivity = new Activity(activityDTO)
        const activityId = await ActivityDAO.createActivity(newActivity)
        if(activityId){
            response = {code:STATUS_RESPONSE.OK, message:'activity created', activityId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_activity_by_id = async function(req, res){

    try{
        const activity = await ActivityDAO.getActivityById(req.params.id)

        if(activity){
            const canUserReadTeam = await UserService.userCanReadATeam(req.user.id, activity.equipe)
            if(!canUserReadTeam){
                return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'Acces denied'})
            }
        }

        return res.status(STATUS_RESPONSE.OK).json({code:STATUS_RESPONSE.OK,activity})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

exports.delete_activity = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    /*const isAdminOfTeam = await CoachDAO.isAdminOfTeam(equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }*/

    ActivityDAO.deleteActivityById(req.params.id).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'activity deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch((error)=>{
        console.log(error)
        res.status(STATUS_RESPONSE.ERROR).json(response)
    })
}

exports.get_summary_activity = async function(req, res){
    try{
        const summary = await ActivityService.getActivitySummary(req.params.id)

        return res.status(STATUS_RESPONSE.OK).json({code:STATUS_RESPONSE.OK, summary})
    }catch(error){
        console.log(error)
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

/*functions controller*/
function validateActivityDTO(activityDTO){
    return activityDTO.name && activityDTO.date_activite && activityDTO.heure && activityDTO.adresse && activityDTO.equipe;
}
