-- CreateTable
CREATE TABLE "Relatorio" (
    "relatorio_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL
);
