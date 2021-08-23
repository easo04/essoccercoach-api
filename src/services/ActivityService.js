const ActivityDAO = require("../models/dao/ActivityDAO")
const AlignementDAO = require("../models/dao/AlignementDAO")
const AvailabilityDAO = require("../models/dao/AvailabilityDAO")
const NoteDAO = require("../models/dao/NoteDAO")
const PlayerDAO = require("../models/dao/PlayerDAO")
const DateService = require("./DateService")
const UserService = require("./UserService")

class ActivityService {

    static async getActivitySummary(idActivity){
        const activity_infos = await ActivityDAO.getActivityById(idActivity)

        const players = await PlayerDAO.getAllPlayersByTeam(activity_infos.equipe)

        const availabilities = await this.getAvailabilitiesByActivity(activity_infos, players)

        const notes = await NoteDAO.getAllNotesByActivity(idActivity)
        let notesDTO = []
        for(let i=0; i < notes.length; i++){
            const noteDTO = await this.getNoteDTO(notes[i])
            notesDTO.push(noteDTO)
        }
        
        const alignement = await AlignementDAO.getAlignementByActivity(idActivity)
        let alignementDTO = this.getAlignementDTO(alignement)

        //TODO obtenir les seances

        return {'notes' : notesDTO, availabilities, 'alignement' : alignementDTO, activity_infos, players}
    }

    static async getAvailabilitiesByActivity(activity, players){
        try{
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

    static async getNoteDTO(note){
        return {
            ...note,
            date_web_created : DateService.getDateWeb(note.created_at),
            user_creation : await UserService.getUserNameById(note.user_create)
        }
    }

    static getAlignementDTO(alignement){
        let alignementDTO = {};
        
        return alignementDTO
    }
}

module.exports = ActivityService