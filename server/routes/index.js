import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { getChat, createChat } from "../controllers/chat.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/chat", authenticateToken, createChat);
router.get("/chat", authenticateToken, getChat);

export default router;
