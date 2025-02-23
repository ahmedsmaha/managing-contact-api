"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
const socket_io_1 = require("socket.io");
class SocketHandler {
    static initialize(server) {
        SocketHandler.io = new socket_io_1.Server(server, { cors: { origin: "*" } });
        SocketHandler.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            socket.on("lockContact", ({ contactId, username }) => {
                if (!SocketHandler.locks[contactId]) {
                    SocketHandler.locks[contactId] = username;
                    SocketHandler.io.emit("contactLocked", { contactId, username });
                }
            });
            socket.on("unlockContact", ({ contactId }) => {
                delete SocketHandler.locks[contactId];
                SocketHandler.io.emit("contactUnlocked", { contactId });
            });
            socket.on("disconnect", () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }
}
exports.SocketHandler = SocketHandler;
SocketHandler.locks = {};
