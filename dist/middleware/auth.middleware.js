"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static authenticate(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            req.user = decoded.username;
            next();
        }
        catch (error) {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
