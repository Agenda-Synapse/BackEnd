const Estabelecimento = require('../models/EstabelecimentoModel')
const Servico = require('../models/ServicoModel')
const Usuario = require('../models/UsuarioModel')
const { v4 } = require('uuid')
const path = require('path')
const fs = require('fs')

exports.getAll = async() => {

    let todosEstabelecimentos = await Estabelecimento.findAll()

    todosEstabelecimentos = todosEstabelecimentos.map( estabelecimento => {
        estabelecimento.imagem = `http://${process.env.IP}:${process.env.PORT}/estabelecimentos/img/${estabelecimento.id}`
        return estabelecimento
    })

    return todosEstabelecimentos

}

// Get all serviços
exports.getAllServicos = async(parametro) => {
    
    const { id } = parametro // id do estabelecimento

    const todosServicos = await Servico.findAll({
        where: { idEstabelecimento: id }
    })

    return todosServicos

}

exports.getById = async(parametro) => {
    if(typeof parametro === 'object') { 

        const { id } = parametro 
        const estabelecimento = await Estabelecimento.findByPk(id)
        estabelecimento.imagem = `http://${process.env.IP}:${process.env.PORT}/estabelecimentos/img/${estabelecimento.id}`
        return estabelecimento
    
    } 

    else { 
        
        const id = parametro 
        const estabelecimento = await Estabelecimento.findByPk(id)
        return estabelecimento
    
    }
}

exports.getImgById = async(parametro) => {

    const { id } = parametro

    const estabelecimento = await Estabelecimento.findByPk(id)

    const img_path = estabelecimento.imagem
    const realImgPath = path.join(process.cwd(),img_path)
    return realImgPath

}

exports.create = async(corpo) => {

    const base64Data = corpo.imagem.replace(/^data:image\/png;base64,/, "");
    const imgPath = `imgs_estabelecimento/${v4()}.png`;
    fs.writeFileSync(imgPath, base64Data, 'base64')
    corpo.imagem = imgPath

    const novoEstabelecimento = await Estabelecimento.create(corpo)
    return novoEstabelecimento

}

exports.update = async(parametro, corpo) => {

    const { id } = parametro

    const estabelecimento = await this.getById(id)

    if(estabelecimento.imagem !== corpo.imagem) {
        await this.delimg(parametro)  

        const base64Data = corpo.imagem.replace(/^data:image\/png;base64,/, "");
        const imgPath = `imgs_estabelecimento/${v4()}.png`;
        fs.writeFileSync(imgPath, base64Data, 'base64')
        corpo.imagem = imgPath
    }

    estabelecimento.set(corpo)
    estabelecimento.save()

}

exports.del = async(parametro) => {

    const { id } = parametro

    await Estabelecimento.destroy({
        where: { id }
    })

}

exports.delImg = async(parametro) => {
    
    const { id } = parametro

    const estabelecimento = await Estabelecimento.findByPk(id)

    const realImgPath = path.join(process.cwd(), estabelecimento.imagem)
    estabelecimento.imagem = ''
    estabelecimento.save()
    await fs.unlinkSync(realImgPath)

}