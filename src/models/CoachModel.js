'user strict'
class Coach{
    constructor(first_name, last_name, role, isAdmin, equipe){
        this.first_name = first_name
        this.last_name = last_name
        this.role = role
        this.is_admin = isAdmin
        this.equipe = equipe
    }
}

module.exports = Coach;