import { prisma } from "../../../prisma/prisma";

const getUser = async (id?: string, phone?: string, includeExercises = false) => {
  const user = await prisma.user.findFirst({
    where: {
      ...(id && { id }),
      ...(phone && { phone }),
    },
    include: {
      userGym: includeExercises
        ? {
            include: {
              userExercise: { include: { exercise: true } },
            },
          }
        : true,
    },
  });

  return user;
};

export default getUser;
