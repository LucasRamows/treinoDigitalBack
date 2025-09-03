import { prisma } from "../../../prisma/prisma";
import deleteReminders from "../deletes/deleteReminders";

const parseDateDMY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const updateTask = async (data: any) => {
  const { name, phone, date, newFields } = data;

  try {
    const formattedDate = date ? parseDateDMY(date) : undefined;

    const task = await prisma.tasks.findFirst({
      where: {
        name,
        date: formattedDate,
        user: {
          phone,
        },
      },
      include: {
        user: true, // traz os dados do usuário junto
      },
    });

    if (!task) {
      throw new Error("Nenhuma task encontrada para atualizar");
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: task.id },
      data: newFields,
      include: {
        user: true,
      },
    });
    deleteReminders(updatedTask.id)
    console.log("Atualizado:", updatedTask);

    return {
      ...updatedTask,
      userId: updatedTask.user.id,
    };
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    throw error;
  }
};

export default updateTask;
