import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const deleteReminderById = async (id:string
) => {
    const reminder = await prisma.reminders.delete({
        where:{id}
    });
    return reminder;
};

export default deleteReminderById;
