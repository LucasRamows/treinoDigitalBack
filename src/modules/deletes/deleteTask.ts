import { prisma } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteTasks = async (id: string
) => {
    const tasks = await prisma.tasks.delete({
        where: { id: id }
    });

    return tasks;
};

export default deleteTasks;
