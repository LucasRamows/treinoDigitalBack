import treatRecivedMessage from "./modules/treatMessages/treatRecivedMessage";

const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(), // salva sessão localmente
  puppeteer: {
    headless: true, // true → navegador invisível, false → aparece (debug)
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // flags para Linux
  },
});

client.on("qr", (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
const sendMessage = async (number: string, messages: string[]) => {
  for (let i = 0; i < messages.length; i++) {
    await client.sendMessage(number, messages[i]);
    console.log(`[INFO] Mensagem enviada para ${number}: ${messages[i]}`);
  }
};
client.on("message", async (msg: any) => {
  const response = await treatRecivedMessage(msg);

  if (response && Array.isArray(response) && response.length > 0) {
    await sendMessage(msg.from, response);
  }
});

client.initialize();
