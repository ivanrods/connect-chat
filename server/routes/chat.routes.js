import { Router } from "express";
import { getChat, createChat, createUpload } from "../controllers/chat.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import { upload } from "../config/multer.js";

const router = Router();

router.use(authenticateToken);

router.get("/", getChat);
router.post("/", createChat);
router.post("/upload", upload.single("file"), createUpload);

export default router;
