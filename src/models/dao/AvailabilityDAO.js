const DataBaseDAO = require('./DataBaseDAO')
const sql = require('../../database')

const TABLE_AVAILABILITY = 'disponibilite'

const SELECT_AVAILABILITY_BY_ACTIVITY = 'SELECT * FROM disponibilite WHERE activite = ?'

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
}

function toDTO(availability){
    const {joueur} = availability
    let present = availability.present === 1 ? true : false
    return {present, joueur}
}

module.exports = AvailabilityDAO