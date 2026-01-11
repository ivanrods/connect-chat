import { Router } from "express";
import {
  getUserConversations,
  getOrCreateConversation,
} from "../controllers/conversation-controller.js";
import {
  getMessages,
  createMessage,
} from "../controllers/message-controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import { upload } from "../config/multer.js";

const router = Router();

router.use(authenticateToken);
router.get("/", getUserConversations);
router.post("/:userId", getOrCreateConversation);
router.get("/:id/messages", getMessages);
router.post("/:id/messages", upload.single("file"), createMessage);

export default router;
