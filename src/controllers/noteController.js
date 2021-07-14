const NoteDAO = require('../models/dao/NoteDAO')
const Note = require('../models/NoteModel')
const { StatusResponse } = require('../models/StatusResponse')


exports.add_note = async function (req, res){
    let response = {code:StatusResponse.ERROR, status:'Error', message:'error'}
    const noteDTO = req.body

    if(!validateDTO(noteDTO)){
        response.message = 'DTO invalid'
        return res.status(StatusResponse.ERROR).json(response)
    }

    try{
        const newNote = new Note(noteDTO)
        const noteId = await NoteDAO.createNote(newNote)
        if(noteId){
            response = {code:StatusResponse.OK, message:'note created', noteId}
            return res.status(StatusResponse.OK).json(response)
        }
    }catch(error){
        return res.status(StatusResponse.ERROR).json(response)
    }
}

exports.get_note_by_id = async function(req, res){

    try{
        const note = await NoteDAO.getNoteById(req.params.id)

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,note})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }
}

exports.get_notes_by_activity = async function(req, res){
    try{
        const notes = await NoteDAO.getAllNotesByActivity(req.params.id)

        return res.status(StatusResponse.OK).json({code:StatusResponse.OK,notes})
    }catch(error){
        return res.status(StatusResponse.ERROR).json({code:StatusResponse.ERROR, status:'Error', message:'error'})
    }
}

exports.delete_note = async function(req, res){
    let response = {
        code:StatusResponse.ERROR,
        status:'Error'
    }

    NoteDAO.deleteNoteById(req.params.id).then(() => {
        response = {
            code:StatusResponse.OK,
            message:'activity deleted'
        }
        return res.status(StatusResponse.OK).json(response)
    }).catch(()=>res.status(StatusResponse.ERROR).json(response))
}

function validateDTO(noteDTO){
    return noteDTO.activite && noteDTO.note
}