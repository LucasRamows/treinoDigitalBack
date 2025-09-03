import { Role, WorkoutType } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";

const createUser = async (
  name: string,
  email: string,
  birthDay: string,
  phone: string,
  key: string,
  role?: string,
  workoutType?: WorkoutType,
  frequency?: number,
  frequencyYear?: number[],
  weight?: number[],
  height?: number[]
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      birthDay,
      phone,
      key,
      role: role === "ADMIN" ? Role.ADMIN : Role.USER,
      userGym: workoutType
        ? {
            create: {
              workoutType,
              frequency: frequency ?? 1,
              frequencyYear: frequencyYear ?? [],
              weigth: weight ?? [],
              height: height ?? [],
            },
          }
        : undefined,
    },
    include: {
      userGym: true, // traz UserGym se criado
    },
  });

  return user;
};

export default createUser;
