import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma

const createUser = async (
  name: string,
  email: string,
  weigth: number[],
  birthDay: string,
  phone: string,
  key: string,
  role?: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      weigth,
      birthDay,
      phone,
      key,
      role: role === "ADMIN" ? Role.ADMIN : Role.USER,
    },
  });

  return user;
};

export default createUser;
