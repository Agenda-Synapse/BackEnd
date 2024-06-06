const Turno = require('../models/TurnoModel')

exports.getAll = async() => {
    const turnos = await Turno.findAll()
    return turnos
}

exports.create = async(corpo) => {

    const { hora_inicio, hora_fim, dias_semana, idEstabelecimento  } = corpo
    const novoTurno = await Turno.create({ hora_inicio, hora_fim, dias_semana, idEstabelecimento })
    return novoTurno
}

exports.getById = async(parametro) => {

    const { id } = parametro

    const turno = await Turno.findByPk(id)
    return turno

}

exports.del = async(parametro) => {

    const { id } = parametro

    Turno.destroy({
        where: { id }
    })

}

exports.update = async(parametro, corpo) => {
    
        const { id } = parametro

        console.log(corpo)
    
        const turno = await Turno.findByPk(id)
        turno.set(corpo)
        turno.save()
        
}