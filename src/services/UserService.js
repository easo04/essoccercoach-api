class UserService{
    static isUserAdminOrPremium(user){
        return user.subscription === 'admin' || user.subscription === 'premium'
    }
}

module.exports = UserService