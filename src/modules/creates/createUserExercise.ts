import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const createUserExercise = async (
    userId: string,
    exerciseId: number,
    weight: number[],
    day: string[],
) => {
    const status = true;
    const newUserExercise = await prisma.userExercise.create({
        data: {
            userId,
            exerciseId,
            weight,
            day,
            status
        },
    });

    return newUserExercise;
};

export default createUserExercise;