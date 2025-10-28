import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyUserData(req, res, next) {
  const { name, username, email, senha, adm, genero, data_nascimento, cpf, setor } = req.body;

  try {

    // name -> mínimo 1 máximo 100
    if (!name || name.length < 1 || name.length > 100) {
      throw Error = res.status(400).json({ message: "Nome inválido." });
    }


    // username-> mínimo 5 máximo 50 e unico
    if (!username || username.length < 5 || username.length > 50) {
      throw Error = res.status(400).json({ message: "O username deve ter entre 5 e 50 caracteres." });
    }
    
    const existsName = await prisma.users.findUnique({
      where: {
        name: name
      }
    })
    
    if(existsName) {
      throw new Error(res.status(400).json({message: "Este nome ja esta sendo utilizado!"}))
    }

    if (!email || !email.includes("@")) {
      throw new Error(res.status(400).json({ message: "Email inválido." }));
    }

    const existingEmail = await prisma.users.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new Error(res.status(400).json({ message: "Este email já está em uso." }));
    }


    // senha -> mínimo 6 caracteres
    if (!senha || senha.length < 6) {
        throw new Error(res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." }));
      }


    // adm -> booleano
    if (typeof adm !== "boolean") {
      throw new Error(res.status(400).json({ message: "O campo 'adm' deve ser true ou false." }));
    }


    // genero -> masculino, feminino ou prefiro não informar

    const generosValidos = ["masculino", "feminino", "prefiro não informar"];

    if (!generosValidos.includes(genero)) {
      throw new Error (res.status(400).json({
        message: "O gênero deve ser 'masculino', 'feminino' ou 'prefiro não informar'.",
      }));
    }


    // data_nascimento -> formato de data válido
    if (isNaN(Date.parse(data_nascimento))) {
      throw new Error(res.status(400).json({ message: "Data de nascimento inválida." }));
    }

    // cpf -> 11 dígitos numéricos sem pontos ou traços ---> tive que pegar no chat, não fazia ideia de como validar pontuação
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      throw new Error(res.status(400).json({ message: "CPF inválido. Deve conter 11 números sem pontuação." }));
    }

    const existingCPF = await prisma.users.findUnique({
      where: { cpf },
    });
    if (existingCPF) {
      throw new Error(res.status(400).json({ message: "Este CPF já está cadastrado." }));
    }

    // setor mínimo 1 máximo 100
    if (!setor || setor.length < 1 || setor.length > 100) {
      throw new Error(res.status(400).json({ message: "O setor deve ter entre 1 e 100 caracteres." }));
    }

    // se tudo estiver certo passa 
    next();

  } catch (Err) {
    console.log(Err)
    res.status(500).json({ message: "Erro na validação", Err });

  }
}

