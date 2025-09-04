import express from "express";
import createTask from "../../modules/creates/createTask";
import createReminder from "../../modules/creates/createReminder";
import getUser from "../../modules/gets/getUser";

const router = express.Router();

router.use(express.json());

const parseDateDMY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // mês no Date é 0-index
};

router.post("/create-task", async (req, res) => {
  try {
    const { name, description, date, isPriority, phone, reminderDays } =
      req.body;

    const userId = await getUser(undefined, phone);
    console.log(userId)
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
      userId?userId.id:"",
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
