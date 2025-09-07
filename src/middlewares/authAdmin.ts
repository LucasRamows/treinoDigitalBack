
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || "null";

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log("Entrou no middleware authAdmin");
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload; 
        if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
            return res.status(403).json({ message: "Acesso negado" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

export default authAdmin;