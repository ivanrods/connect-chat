import { Router } from "express";
import authRoutes from "./auth-routes.js";
import userRoutes from "./users-routes.js";
import conversationRoutes from "./conversations-routes.js";
import chatRoutes from "./chat.routes.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/conversations", conversationRoutes);

//remover depois
router.use("/api/chat", chatRoutes);

export default router;
