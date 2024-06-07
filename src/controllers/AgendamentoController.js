const agendaRepo = require('../repositories/AgendamentoRepository')

exports.getAll = async(req, res) => {
    try {
        
        const agendamentos = await agendaRepo.getAll()
        return res.status(200).json(agendamentos)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por agendamentos!' })

    }
}

exports.getById = async(req, res) => {
    try {
        
        const agendamento = await agendaRepo.getById(req.params)
        return res.status(200).json(agendamento)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por agendamento!' })

    }
}

exports.create = async(req, res) => {
    try {

        const novoAgendamento = await agendaRepo.create(req.body)
        return res.status(201).json({ mensagem: 'Agendamento criado com sucesso!', novoAgendamento })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível criar agendamento!' })
    }
}

exports.del = async(req, res) => {
    try {
        
        await agendaRepo.del(req.params)
        return res.status(200).json({ mensagem: 'Agendamento deletado com sucesso!' })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível deletar agendamento!' })

    }
}

exports.update = async(req, res) => {
    try {
        
        const agendamento = await agendaRepo.update(req.params, req.body)
        return res.status(200).json({ mensagem: 'Agendamento atualizado com sucesso!', agendamento })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível atualizar agendamento!' })

    }
}
