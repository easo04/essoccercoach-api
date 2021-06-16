const sql = require('../../database')

const SELECT_TEAMS_BY_USER_ROLE_COACH = 'SELECT eq.* FROM equipes AS eq INNER JOIN entraineurs AS e ON ' +
                                        'e.equipe = eq.id WHERE e.user = ?'

const SELECT_TEAMS_BY_USER_ROLE_PLAYER = 'SELECT eq.* FROM equipes AS eq INNER JOIN joueurs AS j ON ' +
                                        'j.equipe = eq.id WHERE j.user = ?'

const SELECT_TEAMS_BY_USER_CREATED = 'SELECT * FROM equipes WHERE user_creation = ?' 

const SELECT_TEAMS_BY_PLAYER_AND_TEAM = 'SELECT eq.* FROM equipes AS eq INNER JOIN joueurs AS j ON ' +
                                        'j.equipe = eq.id WHERE j.user = ? AND eq.id = ?'

const SELECT_TEAMS_BY_COACH_AND_TEAM = 'SELECT eq.* FROM equipes AS eq INNER JOIN entraineurs AS e ON ' +
                                        'e.equipe = eq.id WHERE e.user = ? AND eq.id = ?'

class TeamDAO{
    static createTeam(team){
        return new Promise((resolve, reject) =>{
            sql.query("INSERT INTO equipes SET ?", team, function (error, response) {       
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response.insertId)
                }
            })
        })
    }

    static getTeamById(id){
        return new Promise((resolve, reject)=>{
            sql.query("SELECT * FROM equipes WHERE id = ?", id, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response[0])
                }
            })
        })
    }

    static removeTeam (id){
        return new Promise((resolve, reject) =>{
            sql.query("DELETE FROM equipes WHERE id = ?", [id], function (error, response) {
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response)
                }
            })
        })
    }

    static getAllTeamsByUserCreated(idUser){
        return new Promise((resolve, reject)=>{
            sql.query(SELECT_TEAMS_BY_USER_CREATED, idUser, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response)
                }
            })
        })
    }

    static getAllTeamsByUserRoleCoach(idUser){
        return new Promise((resolve, reject)=>{
            sql.query(SELECT_TEAMS_BY_USER_ROLE_COACH, idUser, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response)
                }
            })
        })
    }

    static getAllTeamsByUserRolePlayer(idUser){
        return new Promise((resolve, reject)=>{
            sql.query(SELECT_TEAMS_BY_USER_ROLE_PLAYER, idUser, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response)
                }
            })
        })
    }

    static getTeamByPlayerAndTeam(idUser, idTeam){
        return new Promise((resolve, reject)=>{
            sql.query(SELECT_TEAMS_BY_PLAYER_AND_TEAM, [idUser, idTeam], function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response[0])
                }
            })
        })
    }

    static getTeamByCoachAndTeam(idUser, idTeam){
        return new Promise((resolve, reject)=>{
            sql.query(SELECT_TEAMS_BY_COACH_AND_TEAM, [idUser, idTeam], function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response[0])
                }
            })
        })
    }
}

module.exports = TeamDAO