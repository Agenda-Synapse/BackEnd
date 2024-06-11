const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')
const usuarioRepo = require('../repositories/UsuarioRepository')
const Usuario = require('../models/UsuarioModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/* Verifica se já existe algum usuário com o mesmo login */
exports.existe = async(req, res, next) => {

    const { telefone } = req.body
    
    const resultado = await Usuario.findOne({
        where: { telefone }
    })

    if(!!resultado) {
        return res.status(200).json({ mensagem: 'Usuario já existe!' })
    }

    return next()

}

exports.existeUsuarioId = async(req, res, next) => {

    const { id } = req.params

    const existe = await usuarioRepo.getById(id)

    if(!existe){
        return res.status(404).json({ mensagem: 'Usuário inexistente!' })
    }

    return next()

}

exports.existeEstabelecimento = async(req, res, next) => {

    const { cargo } = req.body

    if (cargo === 'cliente') {
        return next() 
    }

    const { idEstabelecimento } = req.body

    if( idEstabelecimento === null ) return next()

    const estabelecimento = await estabelecimentoRepo.getById(idEstabelecimento)

    if(!!estabelecimento) return next()

    return res.status(404).json({ mensagem: 'Não há estebelecimento com esse id!' })

}

exports.verificaBody = async(req, res, next) => {

    const { nome, email, senha, cpfOuCnpj, telefone, cargo } = req.body

    if(cargo !== 'proprietario' && cargo !== 'cliente') {
        return res.status(400).json({ mensagem: 'Cargo errado! Os cargos são cliente e proprietario.'})
    }

    if(cargo === 'proprietario') {

        if(!!nome && !!email && !!senha && !!cpfOuCnpj && !!cargo && !!telefone) return next()

    }

    if(cargo === 'cliente') {
        if(!!nome && !!telefone) return next()
    }

    return res.status(400).json({ mensagem: 'Informação faltando!' })

}

exports.bodyLoginProp = async(req, res, next) => {

    const { email, senha } = req.body
    
    const usuario = await Usuario.findOne({
        where: { email }
    })


    if(!!usuario) {

        const senhasiguais = await bcrypt.compare(senha, usuario.senha)

        if(senhasiguais) { 
            req.body.usuarioId = usuario.id
            return next()
        }
    }

    return res.status(401).json({ mensagem: 'Email ou senha invalido!' })

}

exports.bodyLoginUsuario = async(req, res, next) => {

    const { nome, telefone } = req.body
    
    const usuario = await Usuario.findOne({
        where: { telefone }
    })

    if(!!usuario) {
        if(nome === usuario.nome) { 
            req.body.usuarioId = usuario.id
            return next()
        }
    }

    return res.status(401).json({ mensagem: 'Nome ou telefone invalidos' })

}

exports.ajustaCpfCnpj = async(req, res, next) => {

    if (!req.body.cpfOuCnpj) return next()

    const { cpfOuCnpj } = req.body

    let cpf = ""
    let cnpj = ""

    if(cpfOuCnpj.length > 11) cnpj = cpfOuCnpj
    else cpf = cpfOuCnpj

    delete req.body.cpfOuCnpj
    
    req.body.cpf = cpf
    req.body.cnpj = cnpj
    
    return next()

}

exports.hashSenha = async(req, res, next) => {

    if(req.body.cargo === 'cliente') return next()
    
    req.body.senha = await bcrypt.hash(req.body.senha, 13)

    return next()

}

exports.verificaToken = async(req, res, next) => {
    const token = req.header['authorization']

    try {

        jwt.verify(token, process.env.SECRET, (decoded) => {
            req.usuarioId = decoded.usuarioId
        })
        
        return next()
        
    } catch (error) {
        
        console.log(error)
        return res.status(401).end()

    }
    
}