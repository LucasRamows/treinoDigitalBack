import express from "express";
import updateManyExercises from "../../modules/updates/updateManyExercises";

const router = express.Router();
router.use(express.json());

router.put("/update-many-user-exercises", async (req, res) => {
  try {
    const { exercises } = req.body; 
    console.log("rota", exercises)
    if (!Array.isArray(exercises)) {
      return res.status(400).json({ error: "O campo 'exercises' deve ser um array." });
    }

    await updateManyExercises(exercises);

    res.json({ message: "Exercícios atualizados com sucesso!" });
  } catch (error) {
    console.error("Erro na rota update-many-user-exercises:", error);
    res.status(500).json({ error: "Erro interno ao atualizar exercícios" });
  }
});

export default router;
