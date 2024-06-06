const Agendamento = require('../models/AgendamentoModel')


exports.getAll = async() => {
    const agendamentos = await Agendamento.findAll()
    return agendamentos
}

exports.create = async(corpo) => {

    const novoAgendamento = await Agendamento.create(corpo)
    return novoAgendamento

}
exports.getById = async(parametro) => {

    const { id } = parametro

    const agendamento = await Agendamento.findByPk(id)

    return agendamento

}

exports.update = async(parametro, corpo) => {
    
    const { id } = parametro
    
    console.log(corpo)
    
    const agendamento = await Agendamento.findByPk(id)
    agendamento.set(corpo)
    agendamento.save()
}

exports.del = async(parametro) => {

    const { id } = parametro

    Agendamento.destroy({
        where: { id }
    })

}
