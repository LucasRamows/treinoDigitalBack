import { prisma } from "../../../prisma/prisma";

const getUser = async (id: string, includeExercises = false) => {
  const user = await prisma.user.findUnique({
    where: { id },
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
