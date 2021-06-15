'user strict'
const sql = require('../database')

//User object constructor
class User {
    constructor(userDTO){
        this.first_name = userDTO.first_name
        this.last_name = userDTO.last_name
        this.email = userDTO.email
        this.password = userDTO.password
        this.user_name = userDTO.user_name
        this.subscription = userDTO.subscription
        this.image_url = userDTO.image_url
        this.image_id = userDTO.image_id
        this.token = userDTO.token
        this.activated = 1
    }
}

module.exports = User;