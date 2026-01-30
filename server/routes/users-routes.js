import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = Router();

router.get("/:id", authenticateToken, getUser);
router.put("/:id", authenticateToken, updateUser);

export default router;
