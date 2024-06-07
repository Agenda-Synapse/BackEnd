const { Router } = require('express')

const agendamentoMid = require('../middlewares/AgendamentoMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')
const agendamentoController = require('../controllers/AgendamentoController')

const router = Router()

// GetALL
router.get('/agendamentos', agendamentoController.getAll)


// GetById
router.get(
    '/agendamentos/:id',
    globalMid.verificaParametro,
    agendamentoMid.existeAgendamentoId,
    agendamentoController.getById
)

// Create
router.post(
    '/agendamentos',
    agendamentoMid.verificaBody,
    agendamentoMid.existe,
    agendamentoMid.existeUsuario,                   
    agendamentoMid.existeServico,      
    agendamentoMid.usuarioTemServico,      
    agendamentoController.create 
)

// Update
router.put(
    '/agendamentos/:id',
    globalMid.verificaParametro,
    agendamentoMid.existeAgendamentoId,
    agendamentoMid.existeUsuario,
    agendamentoMid.existeServico,
    agendamentoMid.verificaBody,
    agendamentoMid.verificaBodyIgual, 
    agendamentoController.update
)

// Delete
router.delete(
    '/agendamentos/:id',
    globalMid.verificaParametro,
    agendamentoMid.existeAgendamentoId,
    agendamentoController.del
)


module.exports = router