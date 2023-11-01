import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//route to insert new rooms
router.post("/insertHabitacion", async (req, res) => {
  try {
    const newhab = await prisma.habitacion.create({
      data: {
        numero: parseInt(req.body.numero),
        tipo: req.body.tipo,
        capacidad: parseInt(req.body.capacidad),
        descripcion: req.body.descripcion,
        precio: parseFloat(req.body.precio),
        disponibilidad: req.body.disponibilidad,
      },
    });
    console.log(newhab);
    res.json({ id_habitacion: newhab.id_habitacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//router para actualizar las habitaciones segun un ID
router.put("/habitacion/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const habitacion = await prisma.habitacion.update({
      where: { id_habitacion: parseInt(id) },
      data: {
        disponibilidad: req.body.disponibilidad,
        precio: parseFloat(req.body.precio),
        descripcion: req.body.descripcion,
      },
    });

    res.json(habitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/reservacion", async (req, res) => {
  try {
    const newres = await prisma.reservaciones.create({
      data: req.body,
    });
    res.json(newres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/detalleshabitacion", async (req, res) => {
  try {
    const detallesReservacion = await prisma.habitacion.findMany({
      include: {
        fotos: {
          select: {
            foto1: true,
          },
        },
      },
    });

    if (!detallesReservacion) {
      return res
        .status(404)
        .json({ error: "No se encontraron detalles de reservaciones" });
    }

    res.status(200).json(detallesReservacion);
  } catch (error) {
    console.error("Error al obtener los detalles de la reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/detallesreservacion", async (req, res) => {
  try {
    const detallesReservacion = await prisma.habitacion.findMany();
    res.status(200).json(detallesReservacion);
  } catch (error) {
    console.error("Error al obtener los detalles de la reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
router.put("/disponibilidad/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await prisma.habitacion.update({
      where: { id_habitacion: parseInt(id) },
      data: {
        disponibilidad: req.body.disponibilidad,
      },
    });
    res.json(habitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/fechasEntrada", async (req, res) => {
  try {
    const fechasEntrada = await prisma.reservaciones.findMany({
      select: {
        fecha_entrada: true,
        fecha_salida: true,
      },
    });
    res.status(200).json(fechasEntrada);
  } catch (error) {
    console.error("Error al obtener las fechas de entrada:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;  
