import { prisma } from "../../../prisma/prisma";

const getUser = async (id?: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      userGym: {
        include: {
          userExercise: { include: { exercise: true } },
        },
      },
      tasks: { include: { reminders: true } },
    },
  });

  return user;
};

export default getUser;
