import { Request } from "express";

interface CRequest extends Request {
    username?: string;
    password?: string;
    user? : string;
}

export { CRequest };
