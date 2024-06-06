const { Router } = require('express')

const usuarioController = require('../controllers/UsuarioController')
const usuarioMid = require('../middlewares/UsuarioMiddlewares')
const globalMid = require('../middlewares/middlewareGlobal')

const router = Router()

// GetALL
router.get('/usuarios', usuarioController.getAll)

//GetById
router.get(
    '/usuarios/:id', 
    globalMid.verificaParametro, 
    usuarioMid.existeUsuarioId, 
    usuarioController.getById
)

// GetImageById
router.get(
    '/usuarios/img/:id', 
    globalMid.verificaParametro, 
    usuarioMid.existeUsuarioId,
    usuarioMid.existeImgId,
    usuarioController.getImgById
)

// Create
router.post(
    '/usuarios', 
    usuarioMid.verificaBody, 
    usuarioMid.existe, 
    usuarioMid.existeEstabelecimento, 
    usuarioController.create
)

// Put
router.put(
    '/usuarios/:id', 
    globalMid.verificaParametro, 
    usuarioMid.existeUsuarioId, 
    usuarioMid.existeEstabelecimento, 
    usuarioMid.verificaBody,
    usuarioController.update
)

// Delete
router.delete(
    '/usuarios/:id', 
    globalMid.verificaParametro, 
    usuarioMid.existeUsuarioId, 
    usuarioController.del
)

// Delete Img
router.delete(
    '/estabelecimentos/img/:id', 
    globalMid.verificaParametro, 
    usuarioMid.existeUsuarioId, 
    usuarioMid.existeImgId,
    usuarioController.delImg
)

module.exports = router