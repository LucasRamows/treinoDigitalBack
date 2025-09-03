import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteAllReminders = async (
) => {
    const tasks = await prisma.reminders.deleteMany({
    });

    return tasks;
};

export default deleteAllReminders;
