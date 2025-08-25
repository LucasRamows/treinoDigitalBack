import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const createExercise = async (
    name: string,
    description: string,
) => {
    const newExercise = await prisma.exercise.create({
        data: {
            name,
            description
        },
    });

    return newExercise;
};

export default createExercise;
