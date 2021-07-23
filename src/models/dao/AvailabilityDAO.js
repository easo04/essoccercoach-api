const DataBaseDAO = require('./DataBaseDAO')
const sql = require('../../database')

const TABLE_AVAILABILITY = 'disponibilite'

const SELECT_AVAILABILITY_BY_ACTIVITY = 'SELECT * FROM disponibilite WHERE activite = ?'

const SELECT_AVAILABILITY_BY_PLAYER_AND_ACTIVITY = 'SELECT * FROM disponibilite WHERE activite = ? AND joueur = ?'

class AvailabilityDAO extends DataBaseDAO{
    static async createAvailability(availabilityDTO){
        return await this.create(TABLE_AVAILABILITY, availabilityDTO)
    }

    static async deleteAvailabilityById(id){
        return await this.deleteById(TABLE_AVAILABILITY, id)
    }

    static async getAvailabilityById(id){
        return await this.getDataById(TABLE_AVAILABILITY, id)
    }

    static async getAllAvailabilityByActivity(idActivity){
        let availabilities = await this.querySelectAll(SELECT_AVAILABILITY_BY_ACTIVITY, idActivity)
        return availabilities.map(availability => toDTO(availability))
    }

    static async getAvailabilityByPlayerAndActivity(idPlayer, idActivity){
        let availability = await this.querySelectFirst(SELECT_AVAILABILITY_BY_PLAYER_AND_ACTIVITY, [idActivity, idPlayer])
        return availability ? toDTO(availability) : null
    } 
    
    static updateAvailability(availabilityDTO){
        return new Promise((resolve, reject) =>{
            sql.query(`UPDATE ${TABLE_AVAILABILITY} SET present = ? WHERE id = ?`, [availabilityDTO.present, availabilityDTO.id], function (error, response) {
                if(error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            })
        })
    }
}

function toDTO(availability){
    const {joueur, id} = availability
    let present = availability.present === 1 ? true : false
    return {present, joueur, id}
}

module.exports = AvailabilityDAO