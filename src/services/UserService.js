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
}

module.exports = UserService