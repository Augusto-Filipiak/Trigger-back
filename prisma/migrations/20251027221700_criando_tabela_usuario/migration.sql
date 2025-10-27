-- CreateTable
CREATE TABLE "Users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "genero" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "foto_perfil" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "setor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
