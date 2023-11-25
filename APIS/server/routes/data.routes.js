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

router.get("/detalleshabitacion1/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const detallesReservacion = await prisma.habitacion.findFirst({
      where: {
        id_habitacion: parseInt(id),
      },
      include: {
        fotos: {
          select: {
            foto1: true,
            foto2: true,
            foto3: true,
          },
        },
      },
    });

    if (!detallesReservacion) {
      return res
        .status(404)
        .json({ error: "No se encontraron detalles de la habitación" });
    }

    res.status(200).json(detallesReservacion);
  } catch (error) {
    console.error("Error al obtener los detalles de la habitación:", error);
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

router.get("/fechasEntrada/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fechasEntrada = await prisma.reservaciones.findMany({
      where: {
        id_habitacion: parseInt(id),
      },
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

router.get("/detallescliente/:comprobante", async (req, res) => {
  const { comprobante } = req.params;
  try {
    const data = await prisma.reservaciones.findMany({
      where: {
        comprobante: comprobante,
      },
    });

    if (data.length === 0) {
      return res.status(404).json({
        error: "No existe una reservación con este número de comprobante",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener datos de la reservación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/eliminarReservacion/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservacionEliminada = await prisma.reservaciones.delete({
      where: {
        id_reservacion: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Reservación eliminada correctamente",
      data: reservacionEliminada,
    });
  } catch (error) {
    console.error("Error al eliminar la reservación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/reportereservacion", async (req, res) => {
  try {
    const detallesReservacion = await prisma.reservaciones.findMany();
    res.status(200).json(detallesReservacion);
  } catch (error) {
    console.error("Error al obtener los detalles de la reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
