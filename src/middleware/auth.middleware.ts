import { Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {CRequest} from "../interfaces/CRequest.interface";

class AuthMiddleware {
    static authenticate(req: CRequest, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(" ")[1];
        const jwtSecret: string = process.env.JWT_SECRET || "default_secret";

        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        try {
            const decoded: string | JwtPayload = jwt.verify(token, jwtSecret);
            req.user = (decoded as { username: string }).username;
            next();
        } catch (error) {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
}

export { AuthMiddleware };
