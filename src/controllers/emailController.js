let Email = require('../models/emailModel.js')

const STATUS_RESPONSE = {
    OK:200,
    ERROR:500
}

exports.add_email = function(req, res) {
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    console.log(req.body)
    let email = new Email(req.body.email)
    Email.add(email).then(emailResponse => {
        response.code = STATUS_RESPONSE.OK
        response.status =  'email added'
        res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(err => res.status(STATUS_RESPONSE.ERROR).json(response))
}

exports.get_all = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    try{
        const emails = await Email.getAll()
        response = {
            code:STATUS_RESPONSE.OK,
            emails
        }
        res.status(STATUS_RESPONSE.OK).json(response)
    }catch(err){
        res.status(STATUS_RESPONSE.ERROR).json(response)
    }
}

exports.delete_email = async function(req, res){
    let response = {
        code:STATUS_RESPONSE.ERROR,
        status:'Error'
    }
    Email.delete(req.params.id).then(resDelete => {
        response = {
            code:STATUS_RESPONSE.OK,
            message:'exercice deleted'
        }
        return res.status(STATUS_RESPONSE.OK).json(response)
    }).catch(err=>res.status(STATUS_RESPONSE.ERROR).json(response))
}