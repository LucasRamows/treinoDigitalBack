import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const getGlobalExercises = async () => {
    const exercises = await prisma.exercise.findMany({
    });

    return exercises;
};

export default getGlobalExercises;
