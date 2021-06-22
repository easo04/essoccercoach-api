const TeamDAO = require("../models/dao/TeamDAO")

class UserService{
    static isUserAdminOrPremium(user){
        return user.subscription === 'admin' || user.subscription === 'premium'
    }

    static async userCanReadATeam(user,team){
        const teamCoach = await TeamDAO.getTeamByCoachAndTeam(user, team)
        const teamPlayer = await TeamDAO.getTeamByPlayerAndTeam(user, team)

        return teamCoach !== undefined || teamPlayer !== undefined
    }

    static getUserDetailsDTO(user){
        const userResponse = user
        
        userResponse.isAdmin = user.subscription === 'admin'
        userResponse.showSeances = this.isUserAdminOrPremium(user)
        userResponse.showTeams = this.isUserAdminOrPremium(user)
        userResponse.canCreateATeam = this.isUserAdminOrPremium(user)

        return userResponse
    }
}

module.exports = UserService