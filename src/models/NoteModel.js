'user strict'

class Note{
    constructor(noteDTO){
        this.activite = noteDTO.activite
        this.note = noteDTO.note
        this.user_create = noteDTO.user_create
    }
}

module.exports = Note