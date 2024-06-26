const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')
const usuarioRepo = require('../repositories/UsuarioRepository')
const Usuario = require('../models/UsuarioModel')

/* Verifica se já existe algum usuário com o mesmo login */
exports.existe = async(req, res, next) => {

    const { email } = req.body
    
    const resultado = await Usuario.findOne({
        where: { email }
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
        return res.status(400).json({ mensagem: 'Usuário inexistente!' })
    }

    return next()

}

exports.existeEstabelecimento = async(req, res, next) => {

    const { cargo } = req.body

    if (cargo !== 2) {
        return next()
    }

    const { idEstabelecimento } = req.body

    const estabelecimento = await estabelecimentoRepo.getById(idEstabelecimento)

    if(!!estabelecimento) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Não há estebelecimento com esse id!' })

}

exports.verificaBody = async(req, res, next) => {

    const { nome, email, senha, cpf, cnpj, telefone, cargo, idEstabelecimento } = req.body

    if(cargo === 2) {

        cpf_cnpj = !!(cpf || cnpj)

        if(!!nome && !!email && !!senha && cpf_cnpj && !!cargo && !!telefone && !!idEstabelecimento) {
            return next()
        }
    }

    return res.status(400).json({ mensagem: 'Informação faltando!' })

}