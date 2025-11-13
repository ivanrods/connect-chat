import http from "http";
import app from "./app.js";
import { setupSocket } from "./config/socket.js";

const server = http.createServer(app);

setupSocket(server);

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
