const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USR, 
    process.env.DB_PASS, {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    port: process.env.DB_PORT
})

async function sincroniza(parametro) {

    if(parametro) {
        await database.sync({ force: true })
    }

    await database.sync()
    
}

module.exports = {
    database,
    sincroniza
}