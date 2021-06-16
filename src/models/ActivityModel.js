'user strict'
class Activity {
    constructor(activityDTO){
        this.name = activityDTO.name
        this.is_match = activityDTO.is_match
        this.adversaire = activityDTO.adversaire
        this.date_activite =  activityDTO.date_activite
        this.heure = activityDTO.heure
        this.adresse = activityDTO.adresse
        this.resultat = activityDTO.resultat
        this.equipe = activityDTO.equipe
        this.heure_arrive = activityDTO.heure_arrive
        this.link_adresse = activityDTO.link_adresse
    }
}

module.exports = Activity;