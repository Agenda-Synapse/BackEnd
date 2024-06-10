const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')
const usuarioRepo = require('../repositories/UsuarioRepository')
const Usuario = require('../models/UsuarioModel')

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

    if( idEstabelecimento === null ) {
        return next()
    }

    const estabelecimento = await estabelecimentoRepo.getById(idEstabelecimento)

    if(!!estabelecimento) {
        return next()
    }

    return res.status(404).json({ mensagem: 'Não há estebelecimento com esse id!' })

}

exports.verificaBody = async(req, res, next) => {

    const { nome, email, senha, cpfOuCnpj, telefone, cargo } = req.body

    if(cargo !== 'proprietario' && cargo !== 'cliente') {
        return res.status(400).json({ mensagem: 'Cargo errado! Os cargos são cliente e proprietario.'})
    }

    if(cargo === 'proprietario') {

        if(!!nome && !!email && !!senha && !!cpfOuCnpj && !!cargo && !!telefone) {
            return next()
        }

    }

    if(cargo === 'cliente') {
        if(!!nome && !!telefone) {
            return next()
        }
    }

    return res.status(400).json({ mensagem: 'Informação faltando!' })

}

exports.ajustaCpfCnpj = async(req, res, next) => {

    if (!req.cpfOuCnpj) {
        return next()
    }

    const { cpfOuCnpj } = req.body

    let cpf = ""
    let cnpj = ""

    if(cpfOuCnpj.length > 11) cnpj = cpfOuCnpj
    else cpf = cpfOuCnpj

    delete req.body.cpfOuCnpj
    
    req.body["cpf"] = cpf
    req.body["cnpj"] = cnpj

}