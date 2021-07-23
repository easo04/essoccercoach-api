const DataBaseDAO = require("./DataBaseDAO")
const sql = require('../../database')

const TABLE_SEANCE = 'seance'
const TABLE_EXERCICE_SEANCE = 'seance_exercice'
const SELECT_SEANCE_BY_ACTIVITY = 'select * from seance where activite = ?'

class SeanceDAO extends DataBaseDAO{

    static async createSeance(seanceDTO){
        return await this.create(TABLE_SEANCE, seanceDTO)
    }

    static async deleteSeanceById(id){
        await this.deleteAllExercicesSeance(id)

        return await this.deleteById(TABLE_SEANCE, id)
    }

    static async getSeanceById(id){
        return await this.getDataById(TABLE_SEANCE, id)
    }

    static async getSeanceByActivity(idActivity){
        return await this.querySelectFirst(SELECT_SEANCE_BY_ACTIVITY, idActivity)
    }

    static async addExerciceToSeance(exercice){
        return await this.create(TABLE_EXERCICE_SEANCE, exercice)
    }

    static async deleteExerciceSeance(idExerciceSeance){
        return await this.deleteById(TABLE_EXERCICE_SEANCE, idExerciceSeance)
    }

    static async deleteAllExercicesSeance(idSeance){
        return new Promise((resolve, reject) =>{
            sql.query(`DELETE FROM ${TABLE_EXERCICE_SEANCE} WHERE seance_id = ?`, [idSeance], function (error, response) {
                if(error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            })
        })
    }

}

module.exports = SeanceDAO