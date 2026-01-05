import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { getChat, createChat, createUpload } from "../controllers/chat.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import { upload } from "../config/multer.js";
import { getUser } from "../controllers/user.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", authenticateToken, getUser);
router.post("/chat", authenticateToken, createChat);
router.get("/chat", authenticateToken, getChat);
router.post("/upload", authenticateToken, upload.single("file"), createUpload);

export default router;
