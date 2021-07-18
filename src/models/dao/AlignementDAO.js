const DataBaseDAO = require("./DataBaseDAO")
const sql = require('../../database')

const TABLE_ALIGNEMENT = 'alignements'

const SELECT_ALIGNEMENT_BY_ACTIVITY = 'SELECT * FROM alignements WHERE activite = ?'

class AlignementDAO extends DataBaseDAO{
    static async createAlignement(alignementDTO){
        return await this.create(TABLE_ALIGNEMENT, alignementDTO)
    }
    static async deleteAlignementById(id){
        return await this.deleteById(TABLE_ALIGNEMENT, id)
    }
    static async getAlignementById(id){
        return await this.getDataById(TABLE_ALIGNEMENT, id)
    }
    static async getAlignementByActivity(idActivity){
        return await this.querySelectFirst(SELECT_ALIGNEMENT_BY_ACTIVITY, idActivity)
    }
    static updateAlignement(alignementDTO){
        return new Promise((resolve, reject) =>{
            sql.query(`UPDATE ${TABLE_ALIGNEMENT} SET defenseurs = ?, milieux = ?, attaquants = ?, remplacants = ?, gardien = ? ' +
                        'WHERE id = ?`, [alignementDTO.defenseurs, alignementDTO.milieux, alignementDTO.attaquants, alignementDTO.remplacants,
                        alignementDTO.gardien, alignementDTO.idActivity], function (error, response) {
                if(error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            })
        })
    }
}

module.exports = AlignementDAO