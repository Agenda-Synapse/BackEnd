exports.verificaParametro = async(req, res, next) => {

    let { id } = req.params

    id = Number(id)

    if(id % 1 !== 0 || typeof id !== 'number') {
        return res.status(400).json({ mensagem: 'O id precisa ser um número inteiro!'})
    }

    if(!id) {
        return res.status(400).json({ mensagem: 'Necessário inserir o id!'})
    }

    return next()

}