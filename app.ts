// whatsapp.ts
import { Client, LocalAuth } from "whatsapp-web.js";

import express from "express";
import cors from "cors";
import publicRoutes from "./src/routes/public";
import privateRoutes from "./src/routes/private";
import adminRoutes from "./src/routes/admin";
import superAdminRoutes from "./src/routes/superAdmin";
import getTodayRemindersRoute from "./src/routes/private/getTodayRemindersRoutes";
import { treatRecivedMessage } from "./wtzp/modules/treatRecivedMessage";
import whatsAppGetReminder from "./src/modules/managers/GetListReminder";
import auth from "./src/middlewares/auth";
import authAdmin from "./src/middlewares/authAdmin";
import authSuperAdmin from "./src/middlewares/authSuperAdmin";
import reminders from "./src/modules/managers/reminders";

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
    for (let i = 0; i < messageBack.length; i++) {
      client.sendMessage(msg.from, messageBack[i]);
    }
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/public", publicRoutes);

app.use("/private", privateRoutes);

app.use("/admin", authAdmin, adminRoutes);

app.use("/superadmin", authSuperAdmin, superAdminRoutes);

app.use("/reminders", auth, getTodayRemindersRoute);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

client.initialize();

(async () => {
  await waitClientReady();
  reminders(60);
})();

export { client, sendMessage };
