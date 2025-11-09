import jwt from "jsonwebtoken";
import "dotenv/config";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
}
