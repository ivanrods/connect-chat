import { Router } from "express";
import { getUser, updateUser, updateUserAvatar } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";
import upload from "../config/upload.js";

const router = Router();

router.get("/:id", authenticateToken, getUser);
router.put("/:id", authenticateToken, updateUser);
router.patch(
  "/:id/avatar",
  authenticateToken,
  upload.single("avatar"),
  updateUserAvatar,
);

export default router;
