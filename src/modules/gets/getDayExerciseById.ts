import { prisma } from "../../../prisma/prisma";
import getUser from "./getUserByPhone";

function getToday(): string {
  const days = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  const todayIndex = new Date().getDay();
  return days[todayIndex];
}

const getDayExercise = async (id?: string) => {
  try {
    const day = getToday();
    const users = await prisma.userExercise.findMany({
      where: {
        userId: id,
        day: {
          has: day,
        },
      },
      include: { exercise: true },
    });

    return users;
  } catch (error) {
    console.error("Erro em getDayExercise:", error);
    return error;
  }
};

export default getDayExercise;
