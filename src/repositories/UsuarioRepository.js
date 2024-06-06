const Usuario = require('../models/UsuarioModel')
const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs')

exports.getAll = async() => {

    let usuarios = await Usuario.findAll()

    usuarios = usuarios.map( usuario => {
        usuario.imagem = `http://${process.env.IP}:${process.env.PORT}/usuarios/img/${usuario.id}`
        return usuario
    })

    return usuarios

}

exports.getById = async(parametro) => {

    if(typeof parametro === 'object') { 
        const { id } = parametro 
        const usuario = await Usuario.findByPk(id)
        usuario.imagem = `http://${process.env.IP}:${process.env.PORT}/usuarios/img/${usuario.id}`
        return usuario
    } 

    const id = parametro 
    const usuario = await Usuario.findByPk(id)
    return usuario

}   

exports.getImgById = async(parametro) => {

    const { id } = parametro

    const usuario = await Usuario.findByPk(id)

    const img_path = usuario.imagem
    const realImgPath = path.join(process.cwd(),img_path)
    return realImgPath

}

exports.create = async(corpo) => {

    const base64Data = corpo.imagem.replace(/^data:image\/png;base64,/, "");
    const imgPath = `imgs/${v4()}.png`;
    fs.writeFileSync(imgPath, base64Data, 'base64')
    corpo.imagem = imgPath

    const novoUsuario = await Usuario.create(corpo)
    return novoUsuario

}

exports.update = async(parametro, corpo) => {

    const { id } = parametro

    const usuario = await this.getById(id)

    if(usuario.imagem !== corpo.imagem) {
        await this.delimg(parametro)  

        const base64Data = corpo.imagem.replace(/^data:image\/png;base64,/, "");
        const imgPath = `imgs/${v4()}.png`;
        fs.writeFileSync(imgPath, base64Data, 'base64')
        corpo.imagem = imgPath
    }

    usuario.set(corpo)
    usuario.save()

}

exports.del = async(parametro) => {

    const { id } = parametro

    await Usuario.destroy({
        where: { id }
    })

}

exports.delImg = async(parametro) => {
    
    const { id } = parametro

    const usuario = await Usuario.findByPk(id)

    const realImgPath = path.join(process.cwd(), usuario.imagem)
    usuario.imagem = ''
    usuario.save()
    await fs.unlinkSync(realImgPath)

}