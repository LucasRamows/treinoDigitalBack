import { prisma } from "../../../prisma/prisma";

const createTask = async (
  name: string,
  description: string,
  phone: string,
  date: Date,
  isPriority: boolean
) => {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        name,
        description,
        date,
        isPriority,
        user: {
          connect: { phone: phone },
        },
      },
    });
    return newTask;
  } catch (error) {
    console.error("Erro ao criar task:", error);
    throw new Error("Não foi possível criar a task.");
  }
};

export default createTask;
