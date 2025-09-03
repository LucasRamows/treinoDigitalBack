import { prisma } from "../../../prisma/prisma";

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
