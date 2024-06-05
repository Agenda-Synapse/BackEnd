const servicoRepo = require('../repositories/ServicoRepository')

exports.getAll = async(req, res) => {

    try {

        const servicos = await servicoRepo.getAll()
        return res.status(200).json(servicos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por serviços' })
    }
}

exports.getById = async(req, res) => {

    try {
        
        const servico = await servicoRepo.getById(req.params)
        return res.status(200).json(servico)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por serviço!' })
    }
}

exports.create = async(req, res) => {
    try {
        
        const novoServico = await servicoRepo.create(req.body)
        return res.status(201).json({ mensagem: 'Serviço criado com sucesso!', novoServico })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível criar serviço!' })
    }
}

exports.update = async(req, res) => {
    
    try {
        
        await servicoRepo.update(req.params, req.body)
        return res.status(200).json({ mensagem: 'Servico atualizado com sucesso!' })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível atualizar servico!' })

    }
}

exports.del = async(req, res) => {
    try {
        
        servicoRepo.del(req.params)
        return res.status(200).json({ mesagem: 'Serviço excluido com sucesso!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível excluir serviço!' })
    }
}