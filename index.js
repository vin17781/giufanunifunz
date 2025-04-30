const express = require("express");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");

const app = express();
const mqttClient = mqtt.connect("mqtt://broker.emqx.io");

app.use(express.json());

app.post("/publish", (req, res) => {
  const { topic, message } = req.body;
  mqttClient.publish(topic, message, () => {
    res.json({ status: "Messaggio pubblicato su MQTT" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su porta ${PORT}`);
});
