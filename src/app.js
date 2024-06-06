const express = require('express')
const cors = require('cors')
const rotasUsuario = require('./routes/UsuarioRoutes')
const rotasEstabelecimento = require('./routes/EstabelecimentoRoutes')
const rotasServico = require('./routes/ServicoRoutes')

const app = express()
app.use(express.json({ limit: 99999999 }))

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200, 
    })
);

app.use(rotasUsuario)
app.use(rotasEstabelecimento)
app.use(rotasServico)

module.exports = app