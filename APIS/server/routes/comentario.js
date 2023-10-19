import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.post("/comment", async (req, res) => {
  try {
    const newhab = await prisma.reportecomentario.create({
      data: req.body,
    });
    res.json(newhab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
