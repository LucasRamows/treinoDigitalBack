import express from "express";
import updateUser from "../../modules/updates/updateUser";
import { WorkoutType } from "@prisma/client";

const router = express.Router();
router.use(express.json());

router.put("/update-user", async (req, res) => {
  try {
    const {
      id,
      name,
      phone,
      email,
      key,
      weight,
      workoutType,
      description,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const updatedUser = await updateUser({
      id,
      name,
      phone,
      email,
      key,
      weight,
      workoutType: workoutType as WorkoutType,
      description,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

export default router;
