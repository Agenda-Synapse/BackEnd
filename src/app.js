const express = require('express')
const cors = require('cors')
const rotasUsuario = require('./routes/UsuarioRoutes')
const rotasEstabelecimento = require('./routes/EstabelecimentoRoutes')
const rotasServico = require('./routes/ServicoRoutes')
const rotasTurno = require('./routes/TurnoRoutes')
const rotasAgendamento = require('./routes/AgendamentoRoutes')

const app = express()
app.use(express.json({ limit: 99999999 }))
app.use(cors())

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200, 
    })
);

app.use(rotasUsuario)
app.use(rotasEstabelecimento)
app.use(rotasServico)
app.use(rotasTurno)
app.use(rotasAgendamento)

module.exports = app