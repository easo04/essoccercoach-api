const DataBaseDAO = require('./DataBaseDAO')

const TABLE_COACH = 'entraineurs'

const SELECT_COACHS_BY_TEAM = 'SELECT * FROM entraineurs WHERE equipe = ?'

const SELECT_COACH_BY_USER_AND_TEAM = 'SELECT * FROM entraineurs WHERE equipe = ? AND user = ?'

class CoachDAO extends DataBaseDAO{
    static async createCoach(coachDTO){
        return await this.create(TABLE_COACH, coachDTO)
    }
    static async deleteCoachById(id){
        return await this.deleteById(TABLE_COACH, id)
    }
    static async getCoachById(id){
        return await this.getDataById(TABLE_COACH, id)
    }
    static async getAllCoachsByTeam(idTeam){
        let coachs = await this.querySelectAll(SELECT_COACHS_BY_TEAM, idTeam)
        return coachs.map(coach => toDTO(coach))
    }
    static async getCoachByUserAndTeam(idTeam, idUser){
        return await this.querySelectFirst(SELECT_COACH_BY_USER_AND_TEAM, [idTeam, idUser])
    }
    static async isAdminOfTeam(idTeam, idUser){
        const coach = await CoachDAO.getCoachByUserAndTeam(idTeam, idUser)

        return coach !== undefined && coach.is_admin === 1
    }
}

function toDTO(coach){
    const {first_name, last_name, role, id} = coach
    let is_admin = coach.is_admin === 1 ? true : false
    return {first_name, last_name, role, is_admin, id}
}

module.exports = CoachDAO