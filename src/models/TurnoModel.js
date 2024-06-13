const Sequelize = require('sequelize')
const { database } = require('../configs/dbConnection')
const Estabelecimento = require('./EstabelecimentoModel')

const Turno = database.define('turno', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false
    },
    hora_fim: {
        type: Sequelize.TIME,
        allowNull: false
    },
    dia_inicio: {
        type: Sequelize.ENUM('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'),
        allowNull: false
    },
    dia_fim: {
        type: Sequelize.ENUM('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'),
        allowNull: false
    }
})

Turno.belongsTo(Estabelecimento, {
    constraint: true,
    foreignKey: 'idEstabelecimento'
})

Estabelecimento.hasMany(Turno, {
    foreignKey: 'idEstabelecimento'
})

module.exports = Turno

