'user strict'
const sql = require('../database')
let User = require('../models/userModel')

class Coach extends User {
    #role
    #isAdmin
    #equipe
    constructor(user, role, isAdmin, equipe){
        super(user)
        this.role = role
        this.isAdmin = isAdmin
        this.equipe = equipe
    }

    get isAdmin(){
        return this.isAdmin
    }

    get equipe(){
        return this.equipe
    }

    get role(){
        return this.role
    }
}

module.exports = Coach;