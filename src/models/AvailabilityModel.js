'user strict'

class Availability {
    constructor(availabilityDTO){
        this.present = availabilityDTO.present
        this.joueur = availabilityDTO.joueur
        this.activite = availabilityDTO.activite
    }
}

module.exports = Availability;