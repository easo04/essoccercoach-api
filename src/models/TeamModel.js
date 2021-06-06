
class Team {
    constructor(name, club, userId, userName){
        this.name = name
        this.club = club
        this.user_creation = userId
        this.user_creation_name = userName
    }

    get getName(){
        return this.name 
    }
    
    get getClub(){
        return this.club
    }
    get getUserId(){
        return this.user_creation
    }
    get getUserName(){
        return this.user_creation_name
    }
}

module.exports = Team;