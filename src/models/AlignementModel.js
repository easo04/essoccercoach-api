'user strict'

class Alignement{
    constructor(alignementDTO){
        this.activite = alignementDTO.activite
        this.defenseurs = alignementDTO.defenseurs
        this.milieux = alignementDTO.milieux
        this.attaquants = alignementDTO.attaquants
        this.remplacants = alignementDTO.remplacants
        this.gardien = alignementDTO.gardien
        this.systeme = alignementDTO.systeme
        this.user_create = alignementDTO.user_create
    }
}

module.exports = Alignement