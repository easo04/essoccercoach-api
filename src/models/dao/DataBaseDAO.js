const sql = require('../../database')

class DataBaseDAO{
    static create(table, data){
        return new Promise((resolve, reject) =>{
            sql.query(`INSERT INTO ${table} SET ?`, data, function (error, response) {       
                if(error) {
                    console.log(error)
                    reject(error)
                }else{
                    resolve(response.insertId)
                }
            })
        })
    }

    static deleteById(table, id){
        return new Promise((resolve, reject) =>{
            sql.query(`DELETE FROM ${table} WHERE id = ?`, [id], function (error, response) {
                if(error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            })
        })
    }

    static getDataById(table, id){
        return new Promise((resolve, reject)=>{
            sql.query(`SELECT * FROM ${table} WHERE id = ?`, id, function(error, response){
                if(error) {
                    reject(error)
                }else{
                    resolve(response[0])
                }
            })
        })
    }

    static querySelectAll(query, params){
        return new Promise((resolve, reject)=>{
            sql.query(query, params, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response)
                }
            })
        })
    }

    static querySelectFirst(query, params){
        return new Promise((resolve, reject)=>{
            sql.query(query, params, function(error, response){
                if(error) {
                    reject(error)
                }
                else{
                    resolve(response[0])
                }
            })
        })
    }
}

module.exports = DataBaseDAO