const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "fragante-verificacion";

// Página de salud
app.get("/", (req, res) => {
  res.status(200).send("FRAGANTE IA - Webhook activo");
});

// Verificación del webhook de Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado correctamente.");
    return res.status(200).send(challenge);
  }

  console.log("Falló la verificación del webhook.");
  return res.sendStatus(403);
});

// Recepción de mensajes/eventos de WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Evento recibido de Meta:");
  console.log(JSON.stringify(req.body, null, 2));

  // Respondemos rápidamente a Meta
  res.sendStatus(200);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FRAGANTE IA escuchando en el puerto ${PORT}`);
});
