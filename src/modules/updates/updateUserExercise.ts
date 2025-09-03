import { prisma } from "../../../prisma/prisma";

const updateUserExercise = async (
  id: string,
  weight?: number | number[],
  day?: string[],
  status?: boolean
) => {
  const data: any = {};

  if (weight !== undefined) {
    // garante que seja array
    const weightArray = Array.isArray(weight) ? weight : [weight];
    data.weight = { push: weightArray.filter(w => w !== undefined) };
  }

  if (day !== undefined) {
    data.day = day;
  }

  if (status !== undefined) {
    data.status = status;
  }

  return prisma.userExercise.update({
    where: { id },
    data,
  });
};

export default updateUserExercise;
