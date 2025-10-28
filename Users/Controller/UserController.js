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

export async function adquirirPatrimonio(req, res) {
    const {user_id, patrimonio_id} = req.params

    const userId = parseInt(user_id)
    const patrimonioId = parseInt(patrimonio_id)

    const pegarIdPatrimonio = await prisma.patrimonios.findUnique({
        where: {
            patrimonio_id: patrimonioId
        }
    })

    const pegarIdUser = await prisma.users.findUnique({
        where: {
            user_id: userId
        }
    })

    const criarRelação = await prisma.usersPatrimonios.create({
        data: {
            user_id: pegarIdUser.user_id,
            patrimonio_id: pegarIdPatrimonio.patrimonio_id
        }
    })
}