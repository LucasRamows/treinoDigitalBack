import { prisma } from "../../../prisma/prisma";
const getGlobalExercises = async () => {
    const exercises = await prisma.exercise.findMany({
    });

    return exercises;
};

export default getGlobalExercises;