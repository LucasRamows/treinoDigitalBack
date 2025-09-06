import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import getUser from "../../modules/gets/getUser";

const router = express.Router();

// Middleware básico
router.use(express.json());

router.post("/get-user", async (req, res) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || "null";

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const phone = undefined;
    const email = decoded.email;
    const id = decoded.id;

    const hasExercise = req.body;

    const exercise = await getUser(id, phone, hasExercise, undefined);

    res.json(exercise);
  } catch (err) {
    console.error("Erro ao processar token:", err);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

export default router;
