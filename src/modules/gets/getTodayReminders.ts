import { prisma } from "../../../prisma/prisma";

const getTodayReminders = async () => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Buscar os reminders de hoje
  const reminders = await prisma.reminders.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      tasks: { include: { user: true } },
    },
  });
  return reminders;
};

export default getTodayReminders;
