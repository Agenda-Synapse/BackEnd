const usuarioRepo = require('../repositories/UsuarioRepository')

exports.getAll = async(req, res) => {
    try {
        
        const usuarios = await usuarioRepo.getAll()
        return res.status(200).json(usuarios)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por usuarios' })

    }
}

exports.getById = async(req, res) => {
    try {
        
        const usuario = await usuarioRepo.getById(req.params)
        return res.status(200).json(usuario)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível encontrar usuário!' })

    }
}

exports.create = async(req, res) => {
    try {
        
        const novoUsuario = await usuarioRepo.create(req.body)
        return res.status(201).json({ mensagem: 'Usuário criado com sucesso!', novoUsuario })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível criar usuário!' })

    }
}

exports.update = async(req, res) => {

    try {
        
        const usuario = await usuarioRepo.update(req.params, req.body)
        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!', usuario })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível atualizar usuário!' })

    }
}

exports.del = async(req, res) => {
    try {
        
        await usuarioRepo.del(req.params)
        return res.status(200).json({ mesagem: `Usuário excluido com sucesso!` })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível excluir usuário!' })
        
    }
}