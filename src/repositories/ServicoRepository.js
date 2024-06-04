const Servico = require('../models/ServicoModel')

exports.getAll = async() => {
    const servicos = await Servico.findAll()
    return servicos
}

exports.getById = async(parametro) => {

    const { id } = parametro

    const servico = await Servico.findByPk(id)

    return servico
    
}

exports.getByIdEstabelecimento = async(parametro) => {

    const { id } = parametro

    servico = await Servico.findAll({
        where: { idEstabelecimento: id }
    })

    return servico
    
}

exports.create = async(corpo) => {

    const novoServico = await Servico.create(corpo)
    return novoServico

}

exports.update = async(parametro, corpo) => {

    const { id } = parametro

    console.log(corpo)

    const servico = await Servico.findByPk(id)
    servico.set(corpo)
    servico.save()

}

exports.del = async(parametro) => {

    const { id } = parametro

    Servico.destroy({
        where: { id }
    })

}   