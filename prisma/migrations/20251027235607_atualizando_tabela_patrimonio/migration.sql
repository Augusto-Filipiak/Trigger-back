-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patrimonios" (
    "patrimonio_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "estoque" INTEGER NOT NULL
);
INSERT INTO "new_Patrimonios" ("estoque", "name", "patrimonio_id", "status") SELECT "estoque", "name", "patrimonio_id", "status" FROM "Patrimonios";
DROP TABLE "Patrimonios";
ALTER TABLE "new_Patrimonios" RENAME TO "Patrimonios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
