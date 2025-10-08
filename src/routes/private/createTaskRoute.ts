import express from "express";
import createReminder from "../../modules/post/createReminder";
import createTask from "../../modules/post/createTask";

const router = express.Router();
router.use(express.json());

const parseDateDMY = (dateStr: string, time?: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  let hours = 0;
  let minutes = 0;
  if (time) {
    [hours, minutes] = time.split(":").map(Number);
  }
  return new Date(year, month - 1, day, hours, minutes);
};

router.post("/create-task", async (req, res) => {
  try {
    const { name, description, date, time, isPriority, phone, reminderDays } = req.body;

    const taskDate = date ? parseDateDMY(date, time) : new Date();
    const newTask = await createTask(name, description, phone, taskDate, isPriority ?? false);

    if (reminderDays) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i <= Number(reminderDays); i++) {
        const reminderDate = new Date(taskDate);
        reminderDate.setDate(reminderDate.getDate() - i);

        if (reminderDate >= today) {
          await createReminder(reminderDate, newTask.id);
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
