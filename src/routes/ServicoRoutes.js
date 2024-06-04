const { Router } = require('express')

const servicoController = require('../controllers/ServicoController')
const servicoMid = require('../middlewares/ServicoMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')

const router = Router()

// GetALL 
router.get('/servicos', servicoController.getAll)

//apenas um comentário

// GetById 
router.get(
    '/servicos/:id', 
    globalMid.verificaParametro,
    servicoMid.existeServicoId,
    servicoController.getById
)

// Create
router.post(
    '/servicos',
    servicoMid.verificaBody,
    servicoMid.existe,
    servicoMid.existeEstabelecimento,
    servicoController.create
)

// update
router.put(
    '/servicos/:id',
    globalMid.verificaParametro, 
    servicoMid.existeServicoId,
    servicoMid.existeEstabelecimento,
    servicoMid.verificaBody,
    servicoMid.verificaBodyIgual,
    servicoController.update
)

// Delete
router.delete(
    '/servicos/:id',
    globalMid.verificaParametro,
    servicoMid.existeServicoId,
    servicoController.del
)

module.exports = router