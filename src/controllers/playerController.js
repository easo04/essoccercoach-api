const Player = require('../models/PlayerModel')
const PlayerDAO = require('../models/dao/PlayerDAO')
const CoachDAO = require('../models/dao/CoachDAO')
const UserService = require('../services/UserService')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500,
    ALREADY_LOGGED:400
}

exports.add_player = async function (req, res){
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}
    const playerDTO = req.body

    if(!validatePlayerDTO(playerDTO)){
        response.message = 'DTO invalid'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    const isAdminOfTeam = await CoachDAO.isAdminOfTeam(playerDTO.equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    try{
        const newPlayer = new Player(playerDTO)
        const playerId = await PlayerDAO.createPlayer(newPlayer)
        if(playerId){
            response = {code:STATUS_RESPONSE.OK, message:'player created', playerId}
            return res.status(STATUS_RESPONSE.OK).json(response)
        }
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }

    return res.status(STATUS_RESPONSE.ERROR).json(response)
}

exports.get_player_by_id = async function(req, res){

    try{
        const player = await PlayerDAO.getPlayerById(req.params.id)

        if(player){
            const canUserReadTeam = await UserService.userCanReadATeam(req.user.id, player.equipe)
            if(!canUserReadTeam){
                return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'Acces denied'})
            }
        }

        res.json({code:STATUS_RESPONSE.OK,player})
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json({code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'})
    }
}

exports.delete_player = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    
    /*const isAdminOfTeam = await CoachDAO.isAdminOfTeam(equipe, req.user.id)
    if(!isAdminOfTeam){
        response.message = 'Acces denied'
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }*/

    PlayerDAO.deletePlayerById(req.params.id).then(() => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'player deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(()=>res.status(STATUS_RESPONSE.ERROR).json(response))
}

/*functions controller*/
function validatePlayerDTO(playerDTO){
    return playerDTO.first_name && playerDTO.last_name && playerDTO.poste && playerDTO.equipe; 
}
