import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verifyUserData(req, res, next) {
  const { name, username, email, senha, adm, genero, data_nascimento, cpf, setor } = req.body;

  try {
    // name
    if (!name || name.length < 1 || name.length > 100) {
      return res.status(400).json({ message: "Nome inválido. Deve ter entre 1 e 100 caracteres." });
    }

    // username
    if (!username || username.length < 5 || username.length > 50) {
      return res.status(400).json({ message: "Username deve ter entre 5 e 50 caracteres." });
    }

    const existsUsername = await prisma.users.findUnique({
      where: { username }
    });
    if (existsUsername) {
      return res.status(400).json({ message: "Este username já está sendo utilizado." });
    }

    // email
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Email inválido." });
    }

    const existingEmail = await prisma.users.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Este email já está em uso." });
    }

    // senha
    if (!senha || senha.length < 6) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    // adm (opcional, mas se enviado deve ser boolean)
    if (adm !== undefined && typeof adm !== "boolean") {
      return res.status(400).json({ message: "O campo 'adm' deve ser true ou false." });
    }

    // genero
    const generosValidos = ["Masculino", "Feminino", "Outros"];
    if (!generosValidos.includes(genero)) {
      return res.status(400).json({ message: "Gênero deve ser 'Masculino', 'Feminino' ou 'Outros'." });
    }

    // data_nascimento
    if (!data_nascimento || isNaN(Date.parse(data_nascimento))) {
      return res.status(400).json({ message: "Data de nascimento inválida." });
    }

    // cpf
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).json({ message: "CPF inválido. Deve conter 11 números sem pontuação." });
    }

    const existingCPF = await prisma.users.findUnique({
      where: { cpf },
    });
    if (existingCPF) {
      return res.status(400).json({ message: "Este CPF já está cadastrado." });
    }

    // setor
    if (!setor || setor.length < 1 || setor.length > 100) {
      return res.status(400).json({ message: "Setor deve ter entre 1 e 100 caracteres." });
    }

    // Se tudo certo
    next();
    
  } catch (error) {
    res.status(500).json({ message: "Erro na validação de dados", error: error.message });
  }
}

