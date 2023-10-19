-- AlterTable
ALTER TABLE "reservaciones" ADD COLUMN     "telefono" VARCHAR(15);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "correo_electronico" VARCHAR(100),
    "telefono" VARCHAR(15),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);
