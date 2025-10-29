import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function validacaoRelatorios(req, res, next) {
    const {tipo, nome, setor, conteudo} = req.body;

    try {
    if (!tipo || !nome || !setor || !conteudo) {
        throw new Error (res.status(400).json({message: "Todos os campos devem ser preenchidos."}));
    }

    if (tipo.length < 3 || tipo.length > 20) {
        throw new Error (res.status(400).json({message: "O campo tipo deve ter entre 3 e 20 caracteres."}));
    }

    if (nome.length < 3 || nome.length > 30) {
        throw new Error (res.status(400).json({message: "O campo nome deve ter entre 3 e 30 caracteres."}));
    }

    if (setor.length < 3 || setor.length > 15) {
        throw new Error (res.status(400).json({message: "O campo setor deve ter entre 3 e 15 caracteres."}));
    }

    if (conteudo.length < 3 || conteudo.length > 200) {
        throw new Error (res.status(400).json({message: "O campo conteudo deve ter entre 3 e 200 caracteres."}));
    }

    next();
    res.status(200).json({message: "Relatório criado com sucesso."});
    
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao criar relatório", error: e.message });
    }


}