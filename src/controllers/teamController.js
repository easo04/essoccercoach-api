let Team = require('../models/TeamModel.js')
let TeamDAO = require('../models/dao/TeamDAO.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_team = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const teamDTO = req.body

    if(!validateTeamDTO(teamDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    let {name, club} = teamDTO

    try{
        const newTeam = new Team(name, club, req.user.id, req.user.user_name)
        const teamId = await TeamDAO.createTeam(newTeam)
        if(teamId){
            response = {code:STATUS_RESPONSE.OK, message:'team created', teamId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_team_by_id = async function(req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}

    try{
        const team = await TeamDAO.getTeamById(req.params.id)
        response = {
            code:STATUS_RESPONSE.OK,
            team
        }
        res.json(response)
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.get_teams = function(req, res){

}

function validateTeamDTO(teamDTO){
    return teamDTO.name !== undefined; 
}
