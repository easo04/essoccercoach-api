'use strict'

class Seance{
    constructor(seanceDTO){
        this.activite = seanceDTO.activite
        this.theme = seanceDTO.theme
        this.duration = seanceDTO.duration
        this.user_created = seanceDTO.user_created
    }
}

module.exports = Seance