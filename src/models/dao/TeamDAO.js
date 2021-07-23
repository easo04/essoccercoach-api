const DataBaseDAO = require('./DataBaseDAO')

const TABLE_TEAMS = 'equipes'

const SELECT_TEAMS_BY_USER_ROLE_COACH = 'SELECT eq.* FROM equipes AS eq INNER JOIN entraineurs AS e ON ' +
                                        'e.equipe = eq.id WHERE e.user = ?'

const SELECT_TEAMS_BY_USER_ROLE_PLAYER = 'SELECT eq.* FROM equipes AS eq INNER JOIN joueurs AS j ON ' +
                                        'j.equipe = eq.id WHERE j.user = ?'

const SELECT_TEAMS_BY_USER_CREATED = 'SELECT * FROM equipes WHERE user_creation = ?' 

const SELECT_TEAMS_BY_PLAYER_AND_TEAM = 'SELECT eq.* FROM equipes AS eq INNER JOIN joueurs AS j ON ' +
                                        'j.equipe = eq.id WHERE j.user = ? AND eq.id = ?'

const SELECT_TEAMS_BY_COACH_AND_TEAM = 'SELECT eq.* FROM equipes AS eq INNER JOIN entraineurs AS e ON ' +
                                        'e.equipe = eq.id WHERE e.user = ? AND eq.id = ?'

const SELECT_NB_TEAMS_BY_USER_CREATION = 'SELECT COUNT(*) AS nb_teams FROM equipes WHERE user_creation = ?'

class TeamDAO extends DataBaseDAO{
    static async createTeam(team){
        return await this.create(TABLE_TEAMS, team)
    }

    static async getTeamById(id){
        return await this.getDataById(TABLE_TEAMS, id)
    }

    static async removeTeam (id){
        return await this.deleteById(TABLE_TEAMS, id)
    }

    static async getAllTeamsByUserCreated(idUser){
        return await this.querySelectAll(SELECT_TEAMS_BY_USER_CREATED, idUser)
    }

    static async getAllTeamsByUserRoleCoach(idUser){
        return await this.querySelectAll(SELECT_TEAMS_BY_USER_ROLE_COACH, idUser)
    }

    static async getAllTeamsByUserRolePlayer(idUser){
        return await this.querySelectAll(SELECT_TEAMS_BY_USER_ROLE_PLAYER, idUser)
    }

    static async getTeamByPlayerAndTeam(idUser, idTeam){
        return await this.querySelectFirst(SELECT_TEAMS_BY_PLAYER_AND_TEAM, [idUser, idTeam])
    }

    static async getTeamByCoachAndTeam(idUser, idTeam){
        return await this.querySelectFirst(SELECT_TEAMS_BY_COACH_AND_TEAM, [idUser, idTeam])
    }

    static async getNbTeamsByUserCreated(idUser){
        return await this.querySelectFirst(SELECT_NB_TEAMS_BY_USER_CREATION, idUser)
    }
}

module.exports = TeamDAO