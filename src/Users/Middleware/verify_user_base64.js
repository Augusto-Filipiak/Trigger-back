import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function verifyUser(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Basic ")) {
            return res.status(401).json({ mensagem: "Token precisa ser Basic" });
        }

        const base64Token = auth.split(" ")[1];
        if (!base64Token) {
            return res.status(401).json({ mensagem: "Token inválido" });
        }

        const decodedToken = Buffer.from(base64Token, 'base64').toString();
        const [nome, ...senhaParts] = decodedToken.split(":");
        const senha = senhaParts.join(":");

        if (!nome || !senha) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        const user = await prisma.users.findFirst({ where: { nome } });
        if (!user) {
            return res.status(401).json({ mensagem: "Usuário não encontrado" });
        }

        // Verifica se a senha fornecida corresponde ao hash armazenado
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ mensagem: "Credenciais inválidas" });
        }

        // Autenticação bem-sucedida
        req.user = user;
        next();

    } catch (erro) {
        console.error("Erro na autenticação:", erro);
        return res.status(500).json({ mensagem: "Erro na autenticação" });
    }
}