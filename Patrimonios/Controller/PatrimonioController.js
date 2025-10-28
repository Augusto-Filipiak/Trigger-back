import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function criarPatrimonio(req, res) {

    const {name, status, estoque} = req.body
    
    
    const newPatrimonio = {
        name: name,
        status: status,
        estoque: estoque
    }

    try {
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