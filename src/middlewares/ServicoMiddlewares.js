const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')
const Estabelecimento = require('../models/EstabelecimentoModel')
const servicoRepo = require('../repositories/ServicoRepository')
const Servico = require('../models/ServicoModel')

/* Verifica se já existe algum servico com o mesmo login */
exports.existe = async(req, res, next) => {

    const { idEstabelecimento } = req.body

    const servicos = await Servico.findAll({
        where: { idEstabelecimento }
    })

    for (const servico of servicos) {
        if(servico.nome === req.body.nome) {
            return res.status(400).json({ mensagem: 'Serviço já existe!' })
        }
    }

    return next()

}

exports.existeServicoId = async(req, res, next) => {

    const { id } = req.params
    const existe = await Servico.findByPk(id)

    if(!existe){
        return res.status(400).json({ mensagem: 'Serviço inexistente!' })
    }

    return next()

}

exports.existeEstabelecimento = async(req, res, next) => {

    const { idEstabelecimento } = req.body
    const estabelecimento = await estabelecimentoRepo.getById(idEstabelecimento)

    if(!!estabelecimento) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Não há estebelecimento com esse id!' })

}

exports.verificaBody = async(req, res, next) => {

    const { nome, duracao, preco, idEstabelecimento } = req.body

    if(!!nome && !!duracao && !!preco && !!idEstabelecimento) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Informação faltando!' })

}

exports.verificaBodyIgual = async(req, res, next) => {
    const { id } = req.params

    let { nome, duracao, preco } = req.body

    const servico = await Servico.findByPk(id)

    preco = String(preco)

    console.log(typeof preco, typeof servico.preco)

    console.log(preco)

    console.log(preco !== servico.preco)

    if(
        nome !== servico.nome
        || duracao !== servico.duracao
        || preco !== servico.preco
    ) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Para atualizar usuário alguma informação deve ser diferente!'})
}