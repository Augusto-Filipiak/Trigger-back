-- CreateTable
CREATE TABLE "Patrimonios" (
    "patrimonio_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "estoque" INTEGER NOT NULL
);
