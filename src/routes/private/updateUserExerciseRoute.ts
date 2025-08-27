import express from "express";
import updateUserExercise from "../../modules/updates/updateUserExercise";

const router = express.Router();

router.use(express.json());

router.put("/update-user-exercise", async (req, res) => {
  try {
    const { id, weight, day, status } = req.body;

    if (!id) {
      return res.status(400).json({ error: "O campo 'id' é obrigatório" });
    }

    const exercise = await updateUserExercise(id, weight, day, status);
    res.json(exercise);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar userExercise" });
  }
});

export default router;
