import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const router = Router();
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

const secretKey = "D5g$!Wt#2v@H7j*Kf%Lp&3s";

//route to insert new administrators
router.post("/insertAd", async (req, res) => {
  try {
    const { nombre, apellido, correo, contrase_a } = req.body;
    console.log(nombre, apellido, correo, contrase_a);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(contrase_a, salt);

    const newAd = await prisma.administrador.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrase_a: hash,
      },
    });
    res.status(201).json(newAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//route para hacer el login
router.post("/login", async (req, res) => {
  try {
    const { correo, contrase_a } = req.body;
    const administrador = await prisma.administrador.findMany({
      where: { correo: correo },
    });

    if (administrador.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const match = await bcrypt.compare(contrase_a, administrador[0].contrase_a);
    if (match) {
      const token = jwt.sign({ correo }, secretKey, { expiresIn: "1h" });

      return res.json({
        mensaje: "Inicio de sesión exitoso",
        token: token,
      });
    } else {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//route to get information from administrators
router.get("/data", async (req, res) => {
  try {
    const detalle = await prisma.administrador.findMany();
    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
