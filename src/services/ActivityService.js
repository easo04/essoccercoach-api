const ActivityDAO = require("../models/dao/ActivityDAO")
const AvailabilityDAO = require("../models/dao/AvailabilityDAO")
const NoteDAO = require("../models/dao/NoteDAO")
const PlayerDAO = require("../models/dao/PlayerDAO")

class ActivityService {

    static async getActivitySummary(idActivity){
        const availabilities = await this.getAvailabilitiesByActivity(idActivity)

        const notes = await NoteDAO.getAllNotesByActivity(idActivity)

        return {notes, availabilities}
    }

    static async getAvailabilitiesByActivity(idActivity){
        try{
            const activity = await ActivityDAO.getActivityById(idActivity)
    
            const players = await PlayerDAO.getAllPlayersByTeam(activity.equipe)
    
            let availabilities = []
    
            for(let i=0;i<players.length;i++){
                const availability = await AvailabilityDAO.getAvailabilityByPlayerAndActivity(players[i].id, activity.id)
                availabilities.push({
                    'availability' : availability ? availability.present : false,
                    'name_player' : players[i].first_name + ' ' + players[i].last_name,
                    'id_player' : players[i].id,
                    'id_availability' : availability ? availability.id : null
                })
            }
    
            return availabilities
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ActivityService