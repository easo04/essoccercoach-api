const ActivityDAO = require("../models/dao/ActivityDAO")
const AlignementDAO = require("../models/dao/AlignementDAO")
const AvailabilityDAO = require("../models/dao/AvailabilityDAO")
const NoteDAO = require("../models/dao/NoteDAO")
const PlayerDAO = require("../models/dao/PlayerDAO")

class ActivityService {

    static async getActivitySummary(idActivity){
        const activity_infos = await ActivityDAO.getActivityById(idActivity)

        const availabilities = await this.getAvailabilitiesByActivity(activity_infos)

        const notes = await NoteDAO.getAllNotesByActivity(idActivity)
        
        const alignement = await AlignementDAO.getAlignementByActivity(idActivity)

        //TODO obtenir les seances

        return {notes, availabilities, alignement, activity_infos}
    }

    static async getAvailabilitiesByActivity(activity){
        try{
    
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