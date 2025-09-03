import express from "express";
import createTask from "../../modules/creates/createTask";
import createReminder from "../../modules/creates/createReminder";

const router = express.Router();

router.use(express.json());

// Função para converter dd/mm/aaaa em Date
const parseDateDMY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // mês no Date é 0-index
};

router.post("/create-task", async (req, res) => {
  try {
    const { name, description, date, isPriority, userId, reminderDays } =
      req.body;

    // Cria a taskDate a partir do formato dd/mm/aaaa ou usa a data atual
    const taskDate = date
      ? parseDateDMY(date)
      : new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );

    // Cria a task
    const newTask = await createTask(
      name,
      description,
      userId,
      taskDate,
      isPriority ?? false
    );

    // Cria os reminders, se informado
    if (reminderDays && !isNaN(reminderDays)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // zerar horas para comparar apenas a data

      for (let index = 0; index <= Number(reminderDays); index++) {
        const reminderDate = new Date(
          taskDate.getFullYear(),
          taskDate.getMonth(),
          taskDate.getDate()
        );
        reminderDate.setDate(reminderDate.getDate() - index);

        // Só cria reminder se a data for >= hoje
        if (reminderDate >= today) {
          const reminder = await createReminder(reminderDate, newTask.id);
          console.log("Reminder criado:", reminder);
        } else {
          console.log("Ignorado reminder em data passada:", reminderDate);
        }
      }
    }

    res.json(newTask);
  } catch (error: any) {
    console.error("Erro na rota /create-task:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
