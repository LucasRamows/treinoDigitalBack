// whatsapp.ts
import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
});

client.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true });
});

let clientReady = false;
client.on('ready', () => {
    console.log('Client is ready!');
    clientReady = true;
});

const waitClientReady = () => {
    return new Promise<void>((resolve) => {
        if (clientReady) resolve();
        else client.once('ready', () => resolve());
    });
};

// função reutilizável para enviar mensagens
const sendMessage = async (phone: string, message: string) => {
    await waitClientReady();
    const formattedPhone = "55" + phone.replace(/\D/g, '') + "@c.us";

    try {
        await client.sendMessage(formattedPhone, message);
        console.log(`Mensagem enviada para ${formattedPhone}`);
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
    }
};

// middleware de exemplo
const onMessage = (callback: (msg: any) => void) => {
    
};

client.initialize();

export { client, sendMessage, onMessage };
