import { Server } from "socket.io";

interface Lock {
    [contactId: string]: string | null;
}

class SocketHandler {
    static io: Server;
    static locks: Lock = {};

    static initialize(server: any): void {
        SocketHandler.io = new Server(server, { cors: { origin: "*" } });

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

export { SocketHandler };
