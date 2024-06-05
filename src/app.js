const express = require('express')
const rotasUsuario = require('./routes/UsuarioRoutes')
const rotasEstabelecimento = require('./routes/EstabelecimentoRoutes')
const rotasServico = require('./routes/ServicoRoutes')

const app = express()
app.use(express.json())

app.use(rotasUsuario)
app.use(rotasEstabelecimento)
app.use(rotasServico)

module.exports = app