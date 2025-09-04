import { prisma } from "../../../prisma/prisma";

const getAndDeleteTodayReminders = async () => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Transação: busca e deleta os reminders do dia
  const reminders = await prisma.$transaction(async (tx) => {
    const toDelete = await tx.reminders.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
      },
      include: { tasks: { include: { user: true } } },
    });

    await tx.reminders.deleteMany({
      where: { id: { in: toDelete.map((r) => r.id) } },
    });

    return toDelete;
  });

  return reminders;
};

export default getAndDeleteTodayReminders;
