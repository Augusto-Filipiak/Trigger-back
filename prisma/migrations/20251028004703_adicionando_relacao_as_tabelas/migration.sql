/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UsersPatrimonios" (
    "user_id" INTEGER NOT NULL,
    "patrimonio_id" INTEGER NOT NULL,
    "data_vinculo" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("user_id", "patrimonio_id"),
    CONSTRAINT "UsersPatrimonios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersPatrimonios_patrimonio_id_fkey" FOREIGN KEY ("patrimonio_id") REFERENCES "Patrimonios" ("patrimonio_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");
