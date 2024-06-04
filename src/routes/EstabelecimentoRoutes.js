const { Router } = require('express')

const estabelecimentoController = require('../controllers/EstabelecimentoController')
const estabelecimentoMid = require('../middlewares/EstabelecimentoMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')

const router = Router()

// GetALL
router.get('/estabelecimentos', estabelecimentoController.getAll)

// GetById
router.get(
    '/estabelecimentos/:id', 
    globalMid.verificaParametro, 
    estabelecimentoMid.existeEstabelecimentoId, 
    estabelecimentoController.getById
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
    estabelecimentoMid.verificaBodyIgual,
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
    estabelecimentoController.delImg
)

module.exports = router