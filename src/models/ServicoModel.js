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
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL,
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