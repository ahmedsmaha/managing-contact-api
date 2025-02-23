import jwt from "jsonwebtoken";
import {User} from "../interfaces/user.interface";

const users: User[] = [
    { username: "user1", password: "user1" },
    { username: "user2", password: "user2" }
];

class AuthService {
    static async authenticate(username: string, password: string): Promise<string | null> {
        const jwtSecret: string = process.env.JWT_SECRET || "default_secret";

        const user:User | undefined = users.find((u:User) => u.username === username && u.password === password);
        if (!user) {
            return null;
        }

        return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
    }
}

export { AuthService };
