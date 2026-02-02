import { Router } from "express";
import {
  getConversations,
  createConversation,
} from "../controllers/conversation-controller.js";
import {
  getMessages,
  createMessage,
} from "../controllers/message-controller.js";

import { toggleFavorite } from "../controllers/favorite-controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import upload from "../config/upload.js";

const router = Router();

router.use(authenticateToken);
router.get("/", getConversations);
router.post("/", createConversation);
router.get("/:id/messages", getMessages);
router.post("/:id/messages", createMessage);
router.post(
  "/:id/messages/upload",
  authenticateToken,
  upload.single("image"),
  createMessage,
);

router.patch("/:id/favorite", toggleFavorite);

export default router;
