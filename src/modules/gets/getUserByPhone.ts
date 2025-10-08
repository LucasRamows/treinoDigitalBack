import { prisma } from "../../../prisma/prisma";

const getUser = async (phone?: string) => {
  const user = await prisma.user.findFirst({
    where: {
      phone: phone,
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
