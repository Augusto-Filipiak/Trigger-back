import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function criarUser(req, res) {
    
    const {name , username , email , senha ,genero , data_nascimento ,foto_perfil ,cpf , setor} = req.body

    const newUser = {
        name: name,
        username: username,
        email: email,
        senha: senha,
        genero: genero,
        data_nascimento: data_nascimento,
        foto_perfil: foto_perfil,
        cpf: cpf,
        setor: setor
    }

    try{
    const usuarios = await prisma.users.create({
        data: newUser
    })

    return res.status(200).json(usuarios)
    } catch(e) {
        return console.log(e)
    }
}