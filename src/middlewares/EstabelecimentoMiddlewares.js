const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')
const usuarioRepo = require('../repositories/UsuarioRepository')
const servicoRepo = require('../repositories/ServicoRepository')
const Estabelecimento = require('../models/EstabelecimentoModel')

exports.existe = async(req, res, next) => {

    const estabelecimentos = await estabelecimentoRepo.pegaTodos()

    if(!estabelecimentos) {
        return res.json({ mensagem: 'Não há estabelecimentos!' }).status(200)
    }

    return next()

}

exports.existeAlgum = async(req, res, next) => {

    const { nome } = req.body
    
    const resultado = await Estabelecimento.findOne({
        where: { nome }
    })

    if(resultado) {
        return res.json({ mensagem: 'Estabelecimento já existe!' }).status(200)
    }

    return next()

}

exports.existeEstabelecimentoId = async(req, res, next) => {
    
    const { id } = req.params

    const estabelecimento = await Estabelecimento.findByPk(id)

    if(!estabelecimento) {
        return res.json({ mensagem: 'Estabelecimento inexistente!' })
    }

    return next()

}

exports.existeImgId = async(req, res, next) => {

    const { id } = req.params

    const estabelecimento = await Estabelecimento.findByPk(id)

    if(!!estabelecimento.imagem) {
        return next()
    }

    return res.status(404).json({ mensagem: 'Não há imagem neste estabelecimento!'})

}

exports.verificaBody = async(req, res, next) => {

    const { nome, imagem, endereco, categoria } = req.body
    if(!nome || !imagem || !endereco || !categoria) {
        return res.status(400).json({ mensagem: 'Falta informação!' })
    }

    if(
        categoria.toLowerCase() === 'unhas' 
        || categoria.toLowerCase() === 'barbearia' 
        || categoria.toLowerCase() === 'maquiagem' 
        || categoria.toLowerCase() === 'salão de beleza'
    ) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Categoria inexistente!' })

}

exports.verificaUsuServ = async(req, res, next) => {

    const usuario = await usuarioRepo.getById(req.params)
    const servico = await servicoRepo.getByIdEstabelecimento(req.params)

    if(!!usuario || !!servico) {
        return res.status(403).json({ mensagem: 'Existe um usuário ou um servico vinculado a esse estabelecimento, impossível excluir!' })
    }

    return next()

}

exports.status = async(req, res, next) => {
    const tempo = new Date()
    const horas = tempo.getHours() < 10 ? `0${tempo.getHours()}` : `${tempo.getHours()}`
    const horario = `${horas}:${tempo.getMinutes()}`
    
}