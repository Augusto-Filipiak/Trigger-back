import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function criarRelatorio(req, res) {
    const { tipo, nome, setor, conteudo} = req.body

    const novoRelatorio = {
        tipo: tipo,
        nome: nome,
        setor: setor,
        conteudo: conteudo
    }

    const criar = prisma.relatorio.create({
        data: novoRelatorio
    })

    return res.status(200).json(criar)
}

export async function editarRelatorio(req, res) {
    const id = parseInt(req.params.id)

    const { tipo, nome, setor, conteudo} = req.body

    const patchRelatorio = prisma.relatorio.update({
        where: {
            relatorio_id: id
        },
        data: {
            tipo: tipo,
            nome: nome,
            conteudo: conteudo,
            setor: setor
        }
    })

    return res.status(200).json(patchRelatorio)
}

export async function excluirRelatorio(req, res) {

    const id = parseInt(req.params.id)

    const deletarRelatorio = prisma.relatorio.delete({
        where: {
            relatorio_id: id
        }
    })

    return res.status(200).json(deletarRelatorio)
}

export async function pegarTodosRelatorios(req, res) {
    return res.status(200).json(prisma.relatorio.findMany())
}