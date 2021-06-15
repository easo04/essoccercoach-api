'user strict'
class Player {
    constructor(playerDTO){
        this.first_name = playerDTO.first_name
        this.last_name = playerDTO.last_name
        this.poste = playerDTO.poste
        this.equipe = playerDTO.equipe
    }
}

module.exports = Player;