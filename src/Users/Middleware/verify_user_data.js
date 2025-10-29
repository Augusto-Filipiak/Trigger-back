import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verifyUserData(req, res, next) {
  const { name, username, email, senha, adm, genero, data_nascimento, cpf, setor } = req.body;

  try {
    /// name
    if (!name) {
      throw new Error (res.status(400).json({message: "Nome é obrigatório"}));
    }
    if (name.length < 3 || name.length > 100) {
      throw new Error (res.status(400).json({ message: "Nome inválido. Deve ter entre 3 e 100 caracteres." }));
    }
    ///


    /// Username
    if (!username) {
      throw new Error (res.status(400).json({message: "Username é obriatório"}));
    }
    if (username.length < 5 || username.length > 20) {
      throw new Error (res.status(400).json({ message: "Nome de usuário deve ter entre 5 e 20 caracteres." }));
    }

    const existsUsername = await prisma.users.findUnique({where: { username }});
    if (existsUsername) {
      throw new Error (res.status(400).json({ message: "Este Nome de usuário já está sendo utilizado." }));
    }
    ///



    /// email
    if (!email) {
      throw new Error (res.status(400),json({ message: "Email é obridatório"}));
    }
    if (!email.includes("@")) {
      throw new Error (res.status(400).json({ message: "Email inválido. Precisa ter @" }));
    }

    const existingEmail = await prisma.users.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new Error (res.status(400).json({ message: "Este email já está em uso." }));
    }
    ///



    /// senha
    if (!senha) {
      throw new Error  (res(400).json({ message: "Senha é obrigatório"}));
    }
    if (senha.length < 6) {
      throw new Error (res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." }));
    }
    ///



    /// adm
    if (adm !== undefined && typeof adm !== "boolean") {
      throw new Error (res.status(400).json({ message: "O campo 'adm' deve ser true ou false." }));
    }
    ///



    /// genero
    const generosValidos = ["Masculino", "Feminino", "Outros"];
    if (!generosValidos.includes(genero)) {
      throw new Error (res.status(400).json({ message: "Gênero deve ser 'Masculino', 'Feminino' ou 'Outros'." }));
    }
    ///



    /// data_nascimento
    if (isNaN(Date.parse(data_nascimento))) {
      throw new Error (res.status(400).json({ message: "Data de nascimento inválida." }));
    }
    ///

  

    /// cpf
    if (!cpf) {
      throw new Errorr (res.status(400).json({ message: "CPF é obrigatório"}));
    }

    // regex pra validar o cpf
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
    ///



    /// setor
    if (setor) {
      return res.status(400).json({ message: "Setor é obrifatório"})
    }
    if (setor.length < 1 || setor.length > 100) {
      return res.status(400).json({ message: "Setor deve ter entre 1 e 100 caracteres." });
    }

    next();
    

  } catch (error) {
    console.error("Erro detalhado do Prisma:", error);
    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });

  

}
}
