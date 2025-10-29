import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function criarUser(req, res) {
    
    const {name , username , email , senha ,genero, adm , data_nascimento ,foto_perfil ,cpf , setor} = req.body

    const newUser = {
        name: name,
        username: username,
        email: email,
        senha: senha,
        adm: adm,
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

       res.status(201).json({ message: "Usuario criado com sucesso"})

    } catch(error) {

      res.status(500).json({ message: "Erro ao criar usuário", error });

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

    res.status(200).json(criarRelação)
}


export async function atualizarUser(req, res) {
  try {
    const id = parseInt(req.params.id)
    const {
      name,
      username,
      email,
      senha,
      genero,
      data_nascimento,
      foto_perfil,
      cpf,
      setor
    } = req.body

    // opcional: verifica se o usuário existe
    const userExists = await prisma.users.findUnique({
      where: { user_id: id }
    })

    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    // Atualiza o usuário
    const updatedUser = await prisma.users.update({
      where: { user_id: id },
      data: {
        name,
        username,
        email,
        senha,
        genero,
        data_nascimento,
        foto_perfil,
        cpf,
        setor
      }
    })

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      user: updatedUser
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      message: 'Erro ao atualizar usuário',
      error: e.message
    })
  }
}