let Player = require('../models/PlayerModel')
let PlayerDAO = require('../models/dao/PlayerDAO')

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

    let {first_name, last_name, poste, equipe} = playerDTO

    try{
        const newPlayer = new Player(first_name, last_name, poste, admin, equipe)
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
    let response = {code:STATUS_RESPONSE.ERROR, status:'Error', message:'error'}

    try{
        const player = await PlayerDAO.getPlayerById(req.params.id)

        response = {
            code:STATUS_RESPONSE.OK,
            player
        }

        res.json(response)
    }catch(error){
        return res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.delete_player = function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
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
