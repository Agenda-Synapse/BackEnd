const Sequelize = require('sequelize')
const { database } = require('../configs/dbConnection')

const Estabelecimento = database.define('estabelecimento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('unhas','barbearia','maquiagem','salão de beleza'),
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultVelue: true
    }
})

module.exports = Estabelecimento