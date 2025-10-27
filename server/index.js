import express from "express";

const app = express();

const PORT = 3333;

app.get("/", (req, res) => {
  res.send("Olá mundo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na prota ${PORT}`);
});
