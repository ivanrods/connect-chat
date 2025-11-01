import express from "express";
import user from "./models/user";

const app = express();

app.use(express.json());

const PORT = 3333;

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await user.create({ name, email, password });
  } catch (err) {
    console.error(res);
  }
});
app.post("/login", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Servidor rodando na prota ${PORT}`);
});
