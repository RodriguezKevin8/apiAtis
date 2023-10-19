/*
  Warnings:

  - The `disponibilidad` column on the `habitacion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "habitacion" DROP COLUMN "disponibilidad",
ADD COLUMN     "disponibilidad" INTEGER;
