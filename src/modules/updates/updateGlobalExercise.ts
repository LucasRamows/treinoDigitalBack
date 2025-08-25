import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const updateGlobalExercise = async (
    id: number,
    name?: string,
    image?: string,
    description?: string
) => {
    const updatedExercise = await prisma.exercise.update({
       where:{id:id},
       data:{
        name, image, description
       }
    });

    return updatedExercise;
};

export default updateGlobalExercise;
