import { prisma } from "../../../prisma/prisma";

const createTask = async ( name:string, description:string, userId:string, date:Date, isPriority:boolean) => {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        name,
        description,
        date,
        isPriority,
        userId
      },

    });
    return newTask;
  } catch (error) {
    console.error("Erro ao criar task:", error);
    throw new Error("Não foi possível criar a task.");
  }
};

export default createTask;
