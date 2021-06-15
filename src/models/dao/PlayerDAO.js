const DataBaseDAO = require('./DataBaseDAO')
const sql = require('../../database')

const TABLE_PLAYER = 'joueurs'

const SELECT_PLAYERS_BY_TEAM = 'SELECT * FROM joueurs WHERE equipe = ?'

class PlayerDAO extends DataBaseDAO{
    static async createPlayer(coachDTO){
        return await this.create(TABLE_PLAYER, coachDTO)
    }
    static async deletePlayerById(id){
        return await this.deleteById(TABLE_PLAYER, id)
    }
    static async getPlayerById(id){
        return await this.getDataById(TABLE_PLAYER, id)
    }
    static async getAllPlayersByTeam(idTeam){
        let players = await this.querySelectAll(SELECT_PLAYERS_BY_TEAM, idTeam)
        return players.map(player => toDTO(player))
    }
}

function toDTO(player){
    const {id, first_name, last_name, poste} = player
    return {id, first_name, last_name, poste}
}

module.exports = PlayerDAO