import { Response } from "express";
import {CRequest} from "../interfaces/CRequest.interface";
import {AuthService} from "../services/auth.service";

const users = [
    { username: "user1", password: "user1" },
    { username: "user2", password: "user2" }
];

class AuthController {
    static async login(req: CRequest, res: Response): Promise<void> {
        const { username, password } = req.body;
        const token = await AuthService.authenticate(username, password);
        if (!token) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }

        res.json({ message: "Login successful", token });
    }
}

export { AuthController };
