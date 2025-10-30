import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verifyUserData(req, res, next) {
  const { name, username, email, senha, adm, genero, data_nascimento, cpf, setor } = req.body;

  try {
    // name
    if (!name) throw new Error("Nome é obrigatório");
    if (name.length < 3 || name.length > 100)
      throw new Error("Nome inválido. Deve ter entre 3 e 100 caracteres.");

    // username
    if (!username) throw new Error("Username é obrigatório");
    if (username.length < 5 || username.length > 20)
      throw new Error("Nome de usuário deve ter entre 5 e 20 caracteres.");

    const existsUsername = await prisma.users.findUnique({ where: { username } });
    if (existsUsername) throw new Error("Este nome de usuário já está sendo utilizado.");

    // email
    if (!email) throw new Error("Email é obrigatório");
    if (!email.includes("@")) throw new Error("Email inválido. Precisa ter @");

    const existingEmail = await prisma.users.findUnique({ where: { email } });
    if (existingEmail) throw new Error("Este email já está em uso.");

    // senha
    if (!senha) throw new Error("Senha é obrigatória");
    if (senha.length < 6)
      throw new Error("A senha deve ter pelo menos 6 caracteres.");

    // adm
    if (adm !== undefined && typeof adm !== "boolean")
      throw new Error("O campo 'adm' deve ser true ou false.");

    // genero
    const generosValidos = ["Masculino", "Feminino", "Outros"];
    if (!generosValidos.includes(genero))
      throw new Error("Gênero deve ser 'Masculino', 'Feminino' ou 'Outros'.");

    // data_nascimento
    if (isNaN(Date.parse(data_nascimento)))
      throw new Error("Data de nascimento inválida.");

    // cpf
    if (!cpf) throw new Error("CPF é obrigatório");
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf))
      throw new Error("CPF inválido. Deve conter 11 números sem pontuação.");

    const existingCPF = await prisma.users.findUnique({ where: { cpf } });
    if (existingCPF) throw new Error("Este CPF já está cadastrado.");

    // setor
    if (!setor) throw new Error("Setor é obrigatório");
    if (setor.length < 1 || setor.length > 100)
      throw new Error("Setor deve ter entre 1 e 100 caracteres.");

    next();
  } catch (error) {
    console.error("Erro de validação:", error.message);
    res.status(400).json({ message: error.message });
  }
}
