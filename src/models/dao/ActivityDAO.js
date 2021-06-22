const DataBaseDAO = require('./DataBaseDAO')
const DateService = require('../../services/DateService')

const TABLE_ACTIVITIES = 'activites'

const SELECT_ACTIVITY_BY_TEAM = 'SELECT * FROM activites WHERE equipe = ?'

class ActivityDAO extends DataBaseDAO{
    static async createActivity(activityDTO){
        return await this.create(TABLE_ACTIVITIES, activityDTO)
    }
    static async deleteActivityById(id){
        return await this.deleteById(TABLE_ACTIVITIES, id)
    }
    static async getActivityById(id){
        return await this.getDataById(TABLE_ACTIVITIES, id)
    }
    static async getAllActivitiesByTeam(idTeam){
        let activities = await this.querySelectAll(SELECT_ACTIVITY_BY_TEAM, idTeam)
        return activities.map(activity => toDTO(activity))
    }
}

function toDTO(activity){
    const {name, adversaire, heure, id, adresse, resultat, heure_arrive, link_adresse} = activity
    let is_match = activity.is_match === 1 ? true : false
    let date_activite = DateService.getDateWeb(activity.date_activite)
    return {name, adversaire, heure, id, adresse, resultat, is_match, date_activite, heure_arrive, link_adresse}
}

module.exports = ActivityDAO