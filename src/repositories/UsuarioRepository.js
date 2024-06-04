const Usuario = require('../models/UsuarioModel')

exports.getAll = async() => {
    const usuarios = await Usuario.findAll()
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

    const { nome, email, senha, cpf, cnpj, telefone, cargo, idEstabelecimento  } = corpo
    
    if(cargo === 2) {
        
        const novoProprietario = await Usuario.create({ nome, email, senha, cpf, cnpj, telefone, cargo, idEstabelecimento })
        return novoProprietario
        
    }

    const novoCliente = await Usuario.create({ nome, email, senha, telefone, cargo })
    return novoCliente

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