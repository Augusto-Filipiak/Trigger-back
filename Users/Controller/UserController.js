import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function criarUser(req, res) {
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
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
    
        if (existingUser) {
            return res.status(400).json({ message: "Esse nome de usuário já está em uso" });
        }
        const usuarios = await prisma.users.create({
            data: newUser
        })

        return res.status(200).json(usuarios)

    } catch(e) {
        return console.log(e)
    }
}