const Sequelize = require('sequelize')
const { database } = require('../configs/dbConnection')
const Estabelecimento = require('./EstabelecimentoModel')

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING
    },
    cnpj: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING,
        unique: true
    },
    cargo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Usuario.belongsTo(Estabelecimento, {
    constraint: true,
    foreignKey: 'idEstabelecimento'
})

Estabelecimento.hasMany(Usuario, {
    foreignKey: 'idEstabelecimento'
})

module.exports = Usuario