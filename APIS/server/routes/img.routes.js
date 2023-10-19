import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configuration to store the image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/upload/:id", upload.array("images"), async (req, res) => {
  try {
    const nombresImagenes = req.files.map((file) => file.filename);

    const { id } = req.params;
    const idEntero = parseInt(id, 10);

    const resultadoBaseDatos = await prisma.fotos.updateMany({
      where: { id_habitacion: idEntero },
      data: {
        foto1: nombresImagenes[0],
        foto2: nombresImagenes[1],
        foto3: nombresImagenes[2],
      },
    });

    res.json({
      success: true,
      imagenes: nombresImagenes,
      resultadoBaseDatos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir imágenes" });
  }
});

router.get("/imagesdata/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const fotos = await prisma.fotos.findMany({
      where: {
        id_habitacion: id,
      },
    });

    res.status(200).json(fotos);
  } catch (error) {
    console.error("Error al obtener las fotos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/imagesdata", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const fotos = await prisma.fotos.findMany();

    res.status(200).json(fotos);
  } catch (error) {
    console.error("Error al obtener las fotos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// path to get image
router.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../../uploads", filename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("La imagen no existe");
  }
});

export default router;
