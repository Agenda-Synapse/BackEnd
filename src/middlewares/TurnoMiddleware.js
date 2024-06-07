const turnoRepo = require('../repositories/TurnoRepository')
const Turno = require('../models/TurnoModel')
const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')


exports.existe = async(req, res, next) => {

    const { idEstabelecimento } = req.body

    const turnos = await Turno.findAll({
        where: { idEstabelecimento }
    })

    for (const turno of turnos) {
        if(turno.hora_inicio === req.body.hora_inicio && turno.hora_fim === req.body.hora_fim && turno.dias_semana === req.body.dias_semana) {
            return res.status(400).json({ mensagem: 'Turno já existe!' })
        }
    }

    return next()

}

exports.existeAlgum = async(req, res, next) => {

    const { hora_inicio, hora_fim, dias_semana, idEstabelecimento } = req.body
    
    const resultado = await Turno.findOne({
        where: { hora_inicio, hora_fim, dias_semana, idEstabelecimento }
    })

    if(resultado) {
        return res.json({ mensagem: 'Turno já existe!' }).status(200)
    }

    return next()

}

exports.verificaBody = async(req, res, next) => {

    const { hora_inicio, hora_fim, dias_semana, idEstabelecimento } = req.body

    if(!!hora_inicio && !!hora_fim && !!dias_semana && !!idEstabelecimento) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Falta informação!' })
}

exports.existeTurnoId = async(req, res, next) => {

    const { id } = req.params
    const existe = await Turno.findByPk(id)

    if(!existe){
        return res.status(400).json({ mensagem: 'Turno Inexistente!' })
    }

    return next()

}

exports.verificaBodyIgual = async(req, res, next) => {
    const { id } = req.params

    let { hora_inicio, hora_fim, dias_semana, idEstabelecimento } = req.body

    const turno = await Turno.findByPk(id)

    if(turno.hora_inicio === hora_inicio && turno.hora_fim === hora_fim && turno.dias_semana === dias_semana && turno.idEstabelecimento === idEstabelecimento) {
        return res.status(400).json({ mensagem: 'Nenhuma alteração foi feita!' })
    }

    return next()
}

exports.existeEstabelecimento = async(req, res, next) => {

    const { idEstabelecimento } = req.body
    const estabelecimento = await estabelecimentoRepo.getById(idEstabelecimento)

    if(!!estabelecimento) {
        return next()
    }

    return res.status(400).json({ mensagem: 'Não há estabelecimento com esse id! '})

}