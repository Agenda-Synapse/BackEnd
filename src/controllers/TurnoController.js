const turnoRepo = require('../repositories/TurnoRepository')

exports.getAll = async(req, res) => {
    try {
        
        const turnos = await turnoRepo.getAll()
        return res.status(200).json(turnos)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por turnos!' })

    }
}

exports.create = async(req, res) => {
    try {
        
         const novoTurno = await turnoRepo.create(req.body)
        return res.status(201).json({ mensagem: 'Turno criado com sucesso!', novoTurno })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível criar novo turno!' })

    }
}

exports.getById = async(req, res) => {

    try {
        
        const turno = await turnoRepo.getById(req.params)
        return res.status(200).json(turno)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por turno!' })
    }
}

exports.del = async(req, res) => {
    try {
        
        turnoRepo.del(req.params)
        return res.status(200).json({ mensagem: 'Turno deletado com sucesso!' })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível deletar turno!' })

    }
}

exports.update = async(req, res) => {

    try {

        const turno = await turnoRepo.update(req.params, req.body)
        return res.status(200).json({ mensagem: 'Turno atualizado com sucesso!', turno })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível atualizar turno!' })

    }
}
