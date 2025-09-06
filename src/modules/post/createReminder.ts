import { prisma } from "../../../prisma/prisma";

const createReminder = async (date: Date, tasksId: string) => {
  try {
    const newReminder = await prisma.reminders.create({
      data: {
        date,
        tasksId,
      },
    });
    return newReminder;
  } catch (error) {
    console.error("Erro ao criar reminder:", error);
    throw new Error("Não foi possível criar o reminder.");
  }
};

export default createReminder;
