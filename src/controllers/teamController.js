const Team = require('../models/TeamModel.js')
const TeamDAO = require('../models/dao/TeamDAO.js')
const TeamService = require('../services/TeamService')
const UserService = require('../services/UserService')
const CoachDAO = require('../models/dao/CoachDAO.js')
const Coach = require('../models/CoachModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_team = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const teamDTO = req.body
    const user = req.user

    if(!validateTeamDTO(teamDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    if(!UserService.isUserAdminOrPremium(req.user)){
        response.message = 'User role invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        const {teamId, coachId} = await TeamService.createTeam(teamDTO, user)

        response = {code:STATUS_RESPONSE.OK, message:'team created', teamId, coachId}
        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_team_by_id = async function(req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}

    try{
        const team = await TeamDAO.getTeamById(req.params.id)

        if(team){
            const canUserReadTeam = await UserService.userCanReadATeam(req.user.id, team.id)
            if(!canUserReadTeam){
                return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'Acces denied'})
            }
        }
        
        res.json({code:STATUS_RESPONSE.OK,team})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_teams_by_user = function(req, res){
    
}

exports.delete_team = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }

    const isAdminOfTeam = await CoachDAO.isAdminOfTeam(req.params.id, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    TeamDAO.removeTeam(req.params.id).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'team deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(()=>res.status(STATUS_RESPONSE.ERROR).json(response))
}

exports.get_summary_teams = async function(req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}

    const idCurrentuser = req.user.id

    try{
        const teams =  await TeamService.getAllTeamsByUser(idCurrentuser)

        const canAddTeam = UserService.isUserAdminOrPremium(req.user) 

        response = {code:STATUS_RESPONSE.OK, status:'Succes', canAddTeam, teams}

        return res.status(STATUS_RESPONSE.OK).json(response)
    }catch(error){
        console.log(error)
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

/*functions controller*/

function validateTeamDTO(teamDTO){
    return teamDTO.name !== undefined; 
}



