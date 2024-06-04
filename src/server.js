// Importações
const { sincroniza } = require('./configs/dbConnection')
const app = require('./app')

// Configura variáveis de ambiente
require('dotenv').config()

// Sincroniza com o banco de dados
sincroniza()

// Portas
const PORT = process.env.PORT || 3000

// Roda o servidor
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}.`))