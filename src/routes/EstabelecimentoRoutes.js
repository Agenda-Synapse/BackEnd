const { Router } = require('express')

const estabelecimentoController = require('../controllers/EstabelecimentoController')
const estabelecimentoMid = require('../middlewares/EstabelecimentoMiddlewares')
const ServicoMid = require('../middlewares/ServicoMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')

const router = Router()

// GetALL
router.get(
    '/estabelecimentos', 
    estabelecimentoMid.status,
    estabelecimentoController.getAll
)

// GetById
router.get(
    '/estabelecimentos/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.status,
    estabelecimentoMid.existeEstabelecimentoId, 
    estabelecimentoController.getById
)

// GetServiço from EstabelecimentoById
router.get(
    '/estabelecimentos/servicos/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.status,
    estabelecimentoMid.existeEstabelecimentoId,
    ServicoMid.existeServicoId,
    estabelecimentoController.getServicoById
)

// GetImageById
router.get(
    '/estabelecimentos/img/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.existeEstabelecimentoId,
    estabelecimentoMid.existeImgId,
    estabelecimentoController.getImgById
)

// Create
router.post(
    '/estabelecimentos', 
    estabelecimentoMid.verificaBody, 
    estabelecimentoMid.existeAlgum, 
    estabelecimentoController.create
)

router.put(
    '/estabelecimentos/:id',
    globalMid.verificaParametro,
    estabelecimentoMid.existeEstabelecimentoId,
    estabelecimentoMid.verificaBody,
    estabelecimentoController.update
)

// Delete
router.delete(
    '/estabelecimentos/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.existeEstabelecimentoId, 
    estabelecimentoMid.verificaUsuServ, 
    estabelecimentoController.del
)

// Delete Img
router.delete(
    '/estabelecimentos/img/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.existeEstabelecimentoId, 
    estabelecimentoMid.existeImgId,
    estabelecimentoController.delImg
)

module.exports = router