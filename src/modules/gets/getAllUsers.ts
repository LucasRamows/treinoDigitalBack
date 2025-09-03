import { prisma } from "../../../prisma/prisma";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      userGym: {
        include: {
          userExercise: true, // inclui exercícios associados
        },
      },
      tasks: {include:{reminders:true}}, 
    },
  });

  return users;
};

export default getAllUsers;
