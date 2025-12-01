import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { getChat, createChat } from "../controllers/chat.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/chat", authenticateToken, createChat);
router.get("/chat", authenticateToken, getChat);

router.post("/upload", upload.single("arquivo"), (req, res) => {
  console.log(req.file);
  res.json({ mensagem: "Upload realizado com sucesso!", arquivo: req.file });
});

export default router;
