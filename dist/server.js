"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const database_1 = require("./config/database");
const http_1 = require("http");
const socket_1 = require("./sockets/socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = (0, http_1.createServer)(app_1.app);
database_1.Database.connect().then(() => {
    socket_1.SocketHandler.initialize(server);
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
