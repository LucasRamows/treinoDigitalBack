import { WorkoutType } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";

const updateUser = async (
    id: string,
    name?: string,
    phone?: string,
    email?: string,
    workoutType?: WorkoutType,
    weigth?: number[], // pesos novos para acrescentar
    key?: string,
) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            name,
            phone,
            email,
            workoutType,
            key,
            ...(weigth && { weigth: { push: weigth } }) // ⬅ só faz push se existir
        }
    });

    return updatedUser;
};

export default updateUser;
