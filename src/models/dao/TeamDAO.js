const sql = require('../../database')

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
}

module.exports = TeamDAO;