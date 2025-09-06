import { prisma } from "../../../prisma/prisma";
import getUser from "./getUser";

function getToday(): string {
  const days = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  const todayIndex = new Date().getDay();
  return days[todayIndex];
}

const getDayExercise = async (id?: string, phone?: string) => {
  try {
    const day = getToday();

    if (id) {
      // Busca pelo ID do usuário
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
    } else {
      // Busca pelo telefone
      const user = await getUser(undefined, phone ?? "", true, undefined);

      if (!user || !user.userGym?.length) {
        throw new Error("Usuário não encontrado ou sem userGym associado");
      }

      const exercises = await prisma.userExercise.findMany({
        where: {
          userId: user.userGym[0].id,
          day: {
            has: day,
          },
        },
        include: { exercise: true },
      });

      return exercises;
    }
  } catch (error: any) {
    console.error("Erro em getDayExercise:", error);
    return { error: error.message ?? "Erro desconhecido" };
  }
};

export default getDayExercise;
