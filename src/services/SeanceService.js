const SeanceDAO = require("../models/dao/SeanceDAO")
const Seance = require("../models/SeanceModel")

class SeanceService{
    static async createSeance(seanceDTO){
        const seance = new Seance(seanceDTO)
        const idSeance = SeanceDAO.createSeance(seance)

        const exercices = seanceDTO.exercices
        for(let i=0; i < exercices.length; i++){

            let exercice = {...exercices[i]}
            exercice.seance_id = idSeance
            await SeanceDAO.addExerciceToSeance(exercice)
        }

        return idSeance
    }

    static async getSeanceById(id){
        return await SeanceDAO.getSeanceById(id)
    }

    static async getSeanceByActivity(idActivity){
        return await SeanceDAO.getSeanceByActivity(idActivity)
    }

    static async deleteSeance(id){
        return await SeanceDAO.deleteSeanceById(id)
    }

    static async updateSeance(seanceDTO){
        //TODO
    }
}

module.exports = SeanceService