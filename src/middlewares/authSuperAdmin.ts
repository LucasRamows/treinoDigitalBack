import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY || "default";

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recebido no middleware authSuperAdminn");

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authSuperAdmin;
