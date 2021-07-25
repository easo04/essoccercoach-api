const DataBaseDAO = require('./DataBaseDAO')
const sql = require('../../database')

const TABLE_NOTE = 'notes'

const SELECT_NOTES_BY_ACTIVITY = 'SELECT * FROM notes WHERE activite = ?'

class NoteDAO extends DataBaseDAO{
    static async createNote(noteDTO){
        return await this.create(TABLE_NOTE, noteDTO)
    }

    static async deleteNoteById(id){
        return await this.deleteById(TABLE_NOTE, id)
    }

    static async deleteNoteByActivity(idActivity){
        return new Promise((resolve, reject) =>{
            sql.query(`DELETE FROM ${TABLE_NOTE} WHERE activite = ?`, [idActivity], function (error, response) {
                if(error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            })
        })
    }

    static async getNoteById(id){
        return await this.getDataById(TABLE_NOTE, id)
    }
    
    static async getAllNotesByActivity(idActivity){
        const notes = await this.querySelectAll(SELECT_NOTES_BY_ACTIVITY, idActivity)
        return notes
    }
}

module.exports = NoteDAO