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
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    senha: {
        type: Sequelize.STRING
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
        type: Sequelize.ENUM('cliente','proprietario')
    },
    status: Sequelize.BOOLEAN
})

Usuario.belongsTo(Estabelecimento, {
    constraint: true,
    foreignKey: 'idEstabelecimento'
})

Estabelecimento.hasMany(Usuario, {
    foreignKey: 'idEstabelecimento'
})

module.exports = Usuario