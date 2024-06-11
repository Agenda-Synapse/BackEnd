const Usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')

exports.getAll = async() => {

    let usuarios = await Usuario.findAll()

    return usuarios

}

exports.getById = async(parametro) => {

    if(typeof parametro === 'object') { 
        const { id } = parametro 
        const usuario = await Usuario.findByPk(id)
        return usuario
    } 

    const id = parametro 
    const usuario = await Usuario.findByPk(id)
    return usuario

}   

exports.create = async(corpo) => {

    if(corpo.cargo === 'cliente') {
        const novoCliente = await Usuario.create(corpo)
        return novoCliente
    }

    const novoProprietario = await Usuario.create(corpo)
    return novoProprietario

}

exports.update = async(parametro, corpo) => {

    const { id } = parametro

    const usuario = await this.getById(id)

    usuario.set(corpo)
    usuario.save()

}

exports.del = async(parametro) => {

    const { id } = parametro

    await Usuario.destroy({
        where: { id }
    })

}

exports.geraToken = async(corpo) => {

    const { usuarioId } = corpo

    const token = await jwt.sign({ usuarioId: usuarioId }, process.env.SECRET, { expiresIn: '5m' })
    
    return token

}