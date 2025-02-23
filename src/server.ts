import dotenv from "dotenv";
import { app } from "./app";
import { Database } from "./config/database";
import { createServer } from "http";
import { SocketHandler } from "./sockets/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = createServer(app);

Database.connect().then(() => {
    SocketHandler.initialize(server);
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
