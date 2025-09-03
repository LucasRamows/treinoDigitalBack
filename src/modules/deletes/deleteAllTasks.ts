import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteAllTasks = async (
) => {
    const tasks = await prisma.tasks.deleteMany({
    });

    return tasks;
};

export default deleteAllTasks;
