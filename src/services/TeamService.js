const PlayerDAO = require('../models/dao/PlayerDAO.js')
const CoachDAO = require('../models/dao/CoachDAO.js')
const TeamDAO = require('../models/dao/TeamDAO.js')

const USER_ROLES = {
    COACH: 'COACH',
    PLAYER: 'PLAYER'
}

class TeamService{

    static async getAllTeamsByUser(idCurrentuser){
        let listTeamsByUser = []
    
        const teamsCoachRoleDTO = await this.getTeamsCoachRoleDTO(idCurrentuser)
        listTeamsByUser.push(teamsCoachRoleDTO)
    
        const teamsPlayerRoleDTO = await this.getTeamsPlayerRoleDTO(idCurrentuser)
        listTeamsByUser.push(teamsPlayerRoleDTO)
    
        return listTeamsByUser
    }
    
    static async getTeamsCoachRoleDTO(idCurrentuser){
        let teamsWithCoachRole =  await TeamDAO.getAllTeamsByUserRoleCoach(idCurrentuser)
        let teams = []
        this.setDetailTeamsDTO(teams, teamsWithCoachRole, idCurrentuser)
    
        return {userRole: USER_ROLES.COACH, teams} 
    }
    
    static async getTeamsPlayerRoleDTO(idCurrentuser){
        let teamsWithPlayerRole = await TeamDAO.getAllTeamsByUserRolePlayer(idCurrentuser)
        let teams = []
        this.setDetailTeamsDTO(teams, teamsWithPlayerRole, idCurrentuser)
    
        return {userRole: USER_ROLES.PLAYER, teams}
    }
    
    static setDetailTeamsDTO(teams, teamsWithRole, user){
        teamsWithRole.forEach(async team => {
            let teamDTO = await this.toDTO(team, user)
            teams.push(teamDTO)
        })
    }
    
    
    static async toDTO(team, user){
        let teamDTO = team
    
        teamDTO.players = await PlayerDAO.getAllPlayersByTeam(team.id)
        teamDTO.coachs = await CoachDAO.getAllCoachsByTeam(team.id)
        teamDTO.activities = []
    
        let isAdmin = await CoachDAO.isAdminOfTeam(team.id, user)
    
        isAdmin = isAdmin ? true : false
    
        teamDTO.canAddPlayers = isAdmin
        teamDTO.canAddCoachs = isAdmin
        teamDTO.canAddActivity = isAdmin
    
        return teamDTO
    }
}

module.exports = TeamService;