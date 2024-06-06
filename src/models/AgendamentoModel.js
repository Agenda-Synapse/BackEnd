const Sequelize = require('sequelize')
const Servico = require('./ServicoModel')
const Usuario = require('./UsuarioModel')
const { database } = require('../configs/dbConnection')

const Agendamento = database.define('Agendamento', {
    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    }
})

Agendamento.belongsTo(Servico, {
    constraint: true,
    foreignKey: 'idServico'
})

Agendamento.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'idUsuario'
})



module.exports = Agendamento

