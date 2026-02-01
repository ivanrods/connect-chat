import { Router } from "express";
import upload from "../config/upload.js";

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  return res.json({
    message: "Upload feito com sucesso",
    url: req.file?.path,
  });
});

export default router;
