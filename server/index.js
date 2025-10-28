import express from "express";

const app = express();

app.use(express.json());

const PORT = 3333;

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/register", async (req, res) => {});
app.post("/login", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Servidor rodando na prota ${PORT}`);
});
