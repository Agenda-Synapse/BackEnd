const { Router } = require('express')

const turnoController = require('../controllers/TurnoController')
const turnoMid = require('../middlewares/TurnoMiddleware')
const usuarioMid = require('../middlewares/UsuarioMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')

const router = Router()

// GetALL
router.get('/turnos', turnoController.getAll)

// Create
router.post(
    '/turnos',
    turnoMid.verificaBody,
    usuarioMid.existeEstabelecimento,
    turnoMid.existe,
    turnoController.create
)

// GetById 
router.get(
    '/turnos/:id',
    globalMid.verificaParametro,
    turnoMid.existeTurnoId,
    turnoController.getById
)

// Update
router.put(
    '/turnos/:id',
    globalMid.verificaParametro,
    turnoMid.existeTurnoId,
    turnoMid.verificaBody,
    turnoMid.verificaBodyIgual,
    turnoController.update
)

// Delete
router.delete(
    '/turnos/:id',
    globalMid.verificaParametro,
    turnoMid.existeTurnoId,
    turnoController.del
)

module.exports = router