import express from "express";
import updateTaskById from "../../modules/updates/updateTaskById";

const router = express.Router();

// Middleware para JSON
router.use(express.json());
router.put("/update-task", async (req, res) => {
  try {
    const { id, newFields } = req.body;
    

    if (!id || !newFields) {
      return res.status(400).json({ error: "id e newFields são obrigatórios" });
    }

    const updatedTask = await updateTaskById({ id, newFields });

    res.json({ message: "Task atualizada com sucesso", task: updatedTask });
  } catch (err) {
    console.error("Erro na rota /update-task:", err);
    res.status(500).json({ error: "Erro ao atualizar task" });
  }
});

export default router;
