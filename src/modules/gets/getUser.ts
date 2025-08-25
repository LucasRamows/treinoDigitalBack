import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const getUser = async (phone?: string, email?: string, includeExercises = false) => {
    try {
        const user = await prisma.user.findUnique({
            where: phone ? { phone } : { email: email! },
            include: {
                UserExercise: includeExercises,
            },
        });

        return user;
    } catch (error) {
      throw new Error("Usuário não encontrado" + {error});
    }
};

export default getUser