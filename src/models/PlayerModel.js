'user strict'
const sql = require('../database')
let User = require('../models/userModel')

class Player extends User {
    #poste
    #equipe
    constructor(user, poste, equipe){
        super(user)
        this.poste = poste
        this.equipe = equipe
    }

    get poste(){
        return this.poste
    }

    get equipe(){
        return this.equipe
    }
}

module.exports = Player;