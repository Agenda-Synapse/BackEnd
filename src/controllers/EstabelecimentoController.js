const estabelecimentoRepo = require('../repositories/EstabelecimentoRepository')

exports.getAll = async(req, res) => {
    try {
        
        const resultado = await estabelecimentoRepo.getAll(req.query)
        return res.status(200).json(resultado)

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível buscar por estabelecimentos!' })

    }
}

exports.getServicoById = async(req, res) => {
    try {

        const servicos =  await estabelecimentoRepo.getAllServicos(req.params)
        return res.status(200).json(servicos)

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível bucar por serviços!' })

    }
}

exports.getById = async(req, res) => {
    try {

        const estabelecimento =  await estabelecimentoRepo.getById(req.params)
        return res.status(200).json(estabelecimento)

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível bucar por estabelecimento!' })

    }
}

exports.getImgById = async(req, res) => {
    try {
        
        const img = await estabelecimentoRepo.getImgById(req.params)
        return res.status(200).sendFile(img)

    } catch (error) {
        
        console.log(error)
        return res.status(200).json({ mensagem: 'Não foi possível pegar a imagem!'})

    }
}

exports.create = async(req, res) => {
    try {
        
        const estabelecimento = await estabelecimentoRepo.create(req.body)
        return res.status(201).json({ mensagem: 'Estabelecimento criado com sucesso!', estabelecimento: estabelecimento.id })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível criar novo estabelecimento!' })

    }
}

exports.update = async(req, res) => {
    
    try {
        
        const estabelecimento = await estabelecimentoRepo.update(req.params, req.body)
        return res.status(200).json({ mensagem: 'Estabelecimento atualizado com sucesso!'})

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível atualizar estabelecimento!' })

    }
}

exports.del = async(req, res) => {
    try {

        await estabelecimentoRepo.del(req.params)
        return res.status(200).json({ mensagem: 'Estabelecimento excluido com sucesso!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível excluir estabelecimento!' })
    }
}

exports.delImg = async(req, res) => {
    try {

        await estabelecimentoRepo.delImg(req.params)
        return res.status(200).json({ mensagem: 'Imagem do estabelecimento excluido com sucesso!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Não foi possível excluir imagem do estabelecimento!' })
    }
}