import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteReminders = async (id:string
) => {
    const tasks = await prisma.reminders.deleteMany({
        where:{tasksId:id}
    });

    return tasks;
};

export default deleteReminders;
