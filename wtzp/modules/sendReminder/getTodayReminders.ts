import { prisma } from "../../../prisma/prisma";

const getAndDeleteTodayReminders = async () => {
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

  if (reminders.length > 0) {
    // Deletar todos os reminders encontrados
    await prisma.reminders.deleteMany({
      where: {
        id: { in: reminders.map((r) => r.id) },
      },
    });
  }
  console.log(reminders)
  return reminders;
};

export default getAndDeleteTodayReminders;
