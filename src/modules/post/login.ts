import { prisma, Role } from "../../../prisma/prisma"; // importa Role do Prisma
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (email: string, key: string) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || "null";

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.key !== key) {
    throw new Error("Credenciais inválidas");
  } else {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "1d",
    });
    return { token };
  }
};

export default loginUser;
