import { prisma } from "../../../prisma/prisma";
import { WorkoutType } from "@prisma/client";

interface UpdateUserParams {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  key?: string;
  weight?: number[];
  workoutType?: WorkoutType;
  description?: string;
}

const updateUser = async ({
  id,
  name,
  phone,
  email,
  key,
  weight,
  workoutType,
}: UpdateUserParams) => {
  // Atualiza dados básicos do usuário
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(key && { key }),
    },
    include: {
      userGym: true,
    },
  });

  // Atualiza dados relacionados ao UserGym, se necessário
  if (weight || workoutType) {
    await prisma.userGym.update({
      where: { userId: id },
      data: {
        ...(weight && { weight: { set: weight } }),
        ...(workoutType && { workoutType }),
      },
    });
  }

  // Retorna o usuário atualizado com os dados do UserGym
  const userWithGym = await prisma.user.findUnique({
    where: { id },
    include: { userGym: true },
  });

  return userWithGym;
};

export default updateUser;
