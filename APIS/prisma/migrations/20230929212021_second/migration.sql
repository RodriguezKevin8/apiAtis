-- CreateTable
CREATE TABLE "administrador" (
    "id_administrador" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "correo" VARCHAR(100),
    "contraseña" VARCHAR(100),

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id_administrador")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id_foto" SERIAL NOT NULL,
    "id_habitacion" INTEGER,
    "foto1" VARCHAR(100),
    "foto2" VARCHAR(100),
    "foto3" VARCHAR(100),

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id_foto")
);

-- CreateTable
CREATE TABLE "habitacion" (
    "id_habitacion" SERIAL NOT NULL,
    "numero" INTEGER,
    "tipo" VARCHAR(50),
    "capacidad" INTEGER,
    "disponibilidad" BOOLEAN,

    CONSTRAINT "habitacion_pkey" PRIMARY KEY ("id_habitacion")
);

-- CreateTable
CREATE TABLE "reportecomentario" (
    "id_reportecomentario" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "detalle" TEXT,

    CONSTRAINT "reportecomentario_pkey" PRIMARY KEY ("id_reportecomentario")
);

-- CreateTable
CREATE TABLE "reportereserva" (
    "id_reporte" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "id_reservacion" INTEGER,
    "detalles" TEXT,

    CONSTRAINT "reportereserva_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "reservaciones" (
    "id_reservacion" SERIAL NOT NULL,
    "nombre" VARCHAR(50),
    "apellido" VARCHAR(50),
    "correo_electronico" VARCHAR(100),
    "id_habitacion" INTEGER,
    "fecha_entrada" DATE,
    "fecha_salida" DATE,
    "estado" VARCHAR(50),

    CONSTRAINT "reservaciones_pkey" PRIMARY KEY ("id_reservacion")
);

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_id_habitacion_fkey" FOREIGN KEY ("id_habitacion") REFERENCES "habitacion"("id_habitacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reportereserva" ADD CONSTRAINT "reportereserva_id_reservacion_fkey" FOREIGN KEY ("id_reservacion") REFERENCES "reservaciones"("id_reservacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reservaciones" ADD CONSTRAINT "reservaciones_id_habitacion_fkey" FOREIGN KEY ("id_habitacion") REFERENCES "habitacion"("id_habitacion") ON DELETE NO ACTION ON UPDATE NO ACTION;
