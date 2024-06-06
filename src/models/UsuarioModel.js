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
        allowNull: false,
        unique: true
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cargo: {
        type: Sequelize.ENUM('cliente','proprietario'),
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