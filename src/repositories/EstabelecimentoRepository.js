const Estabelecimento = require('../models/EstabelecimentoModel')
const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs')

exports.getAll = async() => {

    const todosEstabelecimentos = await Estabelecimento.findAll()
    return todosEstabelecimentos

}

exports.getById = async(parametro) => {
    if(typeof parametro === 'object') { 

        const { id } = parametro 
        const estabelecimento = await Estabelecimento.findByPk(id)
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
    const imgPath = `images/${v4()}.png`;
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
        const imgPath = `images/${v4()}.png`;
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