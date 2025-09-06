import { prisma } from "../../../prisma/prisma";

const getUser = async (id?: string, phone?: string, includeExercises?: boolean, email?: string) => {
  const user = await prisma.user.findFirst({
    where: {
      ...(id && { id }),
      ...(phone && { phone }),
      ...(email && { email }),
    },
    include: {
      userGym: includeExercises
        ? {
            include: {
              userExercise: { include: { exercise: true } },
            },
          }
        : true,
        tasks: {include:{reminders:true}},
    },
  });

  return user;
};

export default getUser;
