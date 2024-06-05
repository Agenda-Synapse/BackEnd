const Sequelize = require('sequelize')
const Estabelecimento = require('./EstabelecimentoModel')
const { database } = require('../configs/dbConnection')

const Servico = database.define('servico', {
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
    duracao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false
    }
})

Servico.belongsTo(Estabelecimento, {
    constraint: true,
    foreignKey: 'idEstabelecimento'
})

Estabelecimento.hasMany(Servico, {
    foreignKey: 'idEstabelecimento'
})

module.exports = Servico