const sql = require('../../database')

const SELECT_TEAMS_BY_USER_ROLE_COACH = 'SELECT eq.* FROM equipes AS eq INNER JOIN entraineurs AS e ON ' +
                                        'e.equipe = eq.id WHERE e.user = ?'

const SELECT_TEAMS_BY_USER_ROLE_PLAYER = 'SELECT eq.* FROM equipes AS eq INNER JOIN joueurs AS j ON ' +
                                        'j.equipe = eq.id WHERE j.user = ?'

const SELECT_TEAMS_BY_USER_CREATED = 'SELECT * FROM equipes WHERE user_creation = ?' 

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
}

module.exports = TeamDAO