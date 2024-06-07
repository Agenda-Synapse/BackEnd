const agendaRepo = require('../repositories/AgendamentoRepository')
const Servico = require('../models/ServicoModel')
const Usuario = require('../models/UsuarioModel')
const Agenda = require('../models/AgendamentoModel')

exports.existeAgendamentoId = async(req, res, next) => {
    const { id } = req.params
    const agendamento = await Agenda.findByPk(id)

    if(!agendamento) {
        return res.status(400).json({ mensagem: 'Agendamento inexistente!' })
    }

    return next()
}

exports.verificaBody = async(req, res, next) => {
    const { data, idServico, idUsuario } = req.body

    if(!!data && !!idServico && !!idUsuario) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Informação faltando!' })
}

exports.existe = async(req, res, next) => {
    const { idUsuario, idServico } = req.body
    const agendamentos = await agendaRepo.getAll()

    for (const agendamento of agendamentos) {
        if(agendamento.idServico === idServico && agendamento.idUsuario === idUsuario) {
            return res.status(400).json({ mensagem: 'Agendamento já existe!' })
        }
    }

    return next()
}

exports.existeUsuario = async(req, res, next) => {
    const { idUsuario } = req.body
    const existe = await Usuario.findByPk(idUsuario)

    if(!!existe){
        return next()
    }

    return res.status(400).json({ mensagem: 'Usuário inexistente!' })
}

exports.existeServico = async(req, res, next) => {
    const { idServico } = req.body
    const existe = await Servico.findByPk(idServico)

    if(!!existe){
        return next()
    }

    return res.status(400).json({ mensagem: 'Serviço inexistente!' })
}

exports.verificaBodyIgual = async(req, res, next) => {
    const { id } = req.params

    let { data, idServico, idUsuario } = req.body

    const agendamento = await Agenda.findByPk(id)

    if(
        data === agendamento.data
        && idServico === agendamento.idServico
        && idUsuario === agendamento.idUsuario
    ) {
        return res.status(400).json({ mensagem: 'Para atualizar o agendamento, alguma informação deve ser diferente!' })
    }

    return next()
}

exports.usuarioTemServico = async(req, res, next) => {
    const { idUsuario, idServico } = req.body
    const agendamentos = await agendaRepo.getAll()

    for (const agendamento of agendamentos) {
        if(agendamento.idServico === idServico && agendamento.idUsuario === idUsuario) {
            return res.status(400).json({ mensagem: 'O usuário já tem um agendamento para este serviço!' })
        }
    }

    return next()
}