import express from "express";
import deleteAllReminders from "../../modules/deletes/deleteAllReminders";
import deleteAllTasks from "../../modules/deletes/deleteAllTasks";

const router = express.Router();

// Middleware para JSON
router.use(express.json());

router.delete("/delete-all-tasks", async (req, res) => {
  try {
    // Deleta todos os lembretes
    const remindersDeleted = await deleteAllReminders();

    // Deleta todas as tasks
    const tasksDeleted = await deleteAllTasks();

    res.status(200).json({
      message: "Todas as tasks e lembretes foram deletados com sucesso",
      remindersDeleted,
      tasksDeleted,
    });
  } catch (error) {
    console.error("Erro ao deletar tasks ou reminders:", error);
    res.status(500).json({ error: "Erro interno ao deletar tasks e reminders" });
  }
});

export default router;
