import { Router } from "express";
import { getUser } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = Router();

router.get("/:id", authenticateToken, getUser);

export default router;
