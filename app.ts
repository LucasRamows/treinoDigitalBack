// whatsapp.ts
import { Client, LocalAuth } from "whatsapp-web.js";
import { treatRecivedMessage } from "./wtzp/modules/treatMessages/treatRecivedMessage";

import express from "express";
import cors from "cors";
import publicRoutes from "./src/routes/public";
import privateRoutes from "./src/routes/private";
import adminRoutes from "./src/routes/admin";
import superAdminRoutes from "./src/routes/superAdmin";
import getTodayRemindersRoute from "./wtzp/modules/sendReminder/getTodayRemindersRoutes";
import whatsAppGetReminder from "./wtzp/modules/sendReminder/whatsAppGetReminder";

const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

let clientReady = false;

// Inicializa o QR code se necessário
client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

// Marca quando o client estiver pronto
client.on("ready", () => {
  console.log("Client is ready!");
  clientReady = true;
});

// Função para aguardar client pronto
const waitClientReady = () => {
  return new Promise<void>((resolve) => {
    if (clientReady) resolve();
    else client.once("ready", () => resolve());
  });
};

// Função para enviar mensagem
const sendMessage = async (phone: string, message: string) => {
  await waitClientReady();
  const formattedPhone = "55" + phone.replace(/\D/g, "") + "@c.us";

  try {
    await client.sendMessage(formattedPhone, message);
    console.log(`Mensagem enviada para ${formattedPhone}`);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
};

// Tratar mensagens recebidas
client.on("message", async (msg) => {
  const messageBack = await treatRecivedMessage(msg);
  if (messageBack) {
    client.sendMessage(msg.from, messageBack);
  }
});

// Inicializa o Express
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", publicRoutes);
app.use("/", privateRoutes);
app.use("/", adminRoutes);
app.use("/", superAdminRoutes);
app.use("/", getTodayRemindersRoute);

app.listen(3050, () => {
  console.log("Servidor rodando em http://localhost:3050");
});

client.initialize();

const TWO_HOURS = 1000 * 60 * 60 * 2;
(async () => {
  await waitClientReady();
  whatsAppGetReminder(); // roda na inicialização
  setInterval(whatsAppGetReminder, TWO_HOURS); // depois a cada 2h
})();

export { client, sendMessage };
