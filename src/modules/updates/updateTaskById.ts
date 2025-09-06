import { prisma } from "../../../prisma/prisma";
import deleteReminders from "../deletes/deleteReminders";

const parseDateDMY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const updateTaskById = async (data: any) => {
  const { id, newFields } = data;

  try {
    // Se newFields tiver uma propriedade 'date' como string DD/MM/YYYY, converte para Date
    if (newFields.date && typeof newFields.date === "string") {
      newFields.date = parseDateDMY(newFields.date);
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: id },
      data: newFields,
      include: {
        user: true,
        reminders: true,
      },
    });

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

export default updateTaskById;
