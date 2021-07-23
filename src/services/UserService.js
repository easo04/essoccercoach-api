const TeamDAO = require("../models/dao/TeamDAO")
const TeamService = require("./TeamService")

class UserService{
    static isUserAdminOrPremium(user){
        return user.subscription === 'admin' || user.subscription === 'premium'
    }

    static async userCanReadATeam(user,team){
        const teamCoach = await TeamDAO.getTeamByCoachAndTeam(user, team)
        const teamPlayer = await TeamDAO.getTeamByPlayerAndTeam(user, team)

        return teamCoach !== undefined || teamPlayer !== undefined
    }

    static async getUserDetailsDTO(user){
        const userResponse = user
        
        userResponse.isAdmin = user.subscription === 'admin'
        userResponse.showSeances = this.isUserAdminOrPremium(user)
        userResponse.showTeams = this.isUserAdminOrPremium(user)
        userResponse.canCreateATeam = await this.canAddTeam(user)

        return userResponse
    }

    static async canAddTeam(user){
        const {nb_teams} = await TeamDAO.getNbTeamsByUserCreated(user.id)
        console.log(nb_teams)

        return this.isUserAdminOrPremium(user) && nb_teams < process.env.NB_MAXIMUM_TEAMS_PER_USER
    }
}

module.exports = UserService