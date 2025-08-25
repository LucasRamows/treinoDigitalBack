import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: { UserExercise:true}
    });

    return users;
};

export default getAllUsers;
