/*
  Warnings:

  - You are about to drop the `UsersPatrimonios` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Patrimonios" ADD COLUMN "id_user_responsavel" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersPatrimonios";
PRAGMA foreign_keys=on;
