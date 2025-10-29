import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function criarPatrimonio(req, res) {

    const id = parseInt(req.params.id)

    const {name, status, estoque, id_user_responsavel} = req.body
    
    const newPatrimonio = {
        name: name,
        status: status,
        estoque: estoque,
        id_user_responsavel: id_user_responsavel 
    }

    try {

        const verificarIdUsuario = await prisma.users.findUnique({
            where: {
                id_user_responsavel: id
            }
        })
        
        if(!verificarIdUsuario) {
            throw new Error({mensagem: "O usuario não existe"})
        }

        const patrimonio = await prisma.patrimonios.create({
            data: newPatrimonio
        }) 

        return res.status(200).send(patrimonio)
    } catch (e) {
        console.log(e)
    }
}

export async function deletarPatrimonio(req, res) {
    const id = parseInt(req.params.id)

    try {
        const deletar = await prisma.patrimonios.delete({
            where: {
                patrimonio_id: id
            }
        })

        return res.status(200).json(deletar)

    } catch (e) {
        console.log(e)
        return
    }
}

export async function pegarTodosPatrimonios(req, res) {
    return res.status(200).json( await prisma.patrimonios.findMany())
}

export async function pegarUmPatrimonio(req, res) {
    const id = parseInt(req.params.id)

    return res.status(200).json( await prisma.patrimonios.findUnique({
        where: {
            patrimonio_id: id
        }
    }))
}

export async function atualizarUmPatrimonio(req, res) {
    const id = parseInt(req.params.id)

    const { name, status, estoque } = req.body
    try {
    
        const verificar = prisma.patrimonios.findUnique({
            where: {
                patrimonio_id: id
            }
        })

        if(!verificar) {
            throw new Error({message: ("Este Patrimonio não existe!")})
        }

        const atualizar = await prisma.patrimonios.update ({
            where: {
                patrimonio_id: id
            },
            data: {
                name: name,
                status: status,
                estoque: estoque
            }
        })

        

        return res.status(200).json(atualizar)

    } catch (e) {
        console.log(e)
    }
}