import updateTask from "../../src/modules/updates/updateTask";
import { SessionManager } from "../sessionManagers";
import extractMessages from "./extractMessages";
import formatPhone from "./formats/formatPhone";

const sessionManager = new SessionManager();

// Função para processar mensagens
const processMessage = async (message: any) => {
  if (!message) return;
  return await extractMessages(message);
};

// Função para lidar com mensagem citada
const handleQuotedMessage = async (msg: any) => {
  try {
    const quoted = await msg.getQuotedMessage?.();
    if (!quoted?.body) return;

    console.log("Condição: mensagem citada");
    console.log("Mensagem citada:", quoted.body);

    const parts = quoted.body.split(":");
    const msgName = parts[1]?.trim();
    const msgParts = quoted.body.split(" ");
    const date = msgParts[2];
    const phone = formatPhone(msg.from);

    if (!msgName || !date) return;

    const updated = await updateTask({
      msg_quot_name: msgName,
      phone,
      date,
      newFields: { status: true },
    });

    console.log("Task atualizada:", updated);
  } catch (err) {
    console.error("Erro ao acessar mensagem citada:", err);
  }
};

// Encerrar sessão
const endSession = async (id: string) => {
  const phone = id;
  sessionManager.delete(phone);
  console.log("Sessão finalizada para:", phone);
};
const treatRecivedMessage = async (msg: any) => {
  const phone = formatPhone(msg.from);
  const sessionId = sessionManager.find(phone);

  // Novo usuário sem mensagem citada
  if (!sessionId && msg.body === "#treino") {
    console.log("Condição: novo usuário sem mensagem citada");
    const message = await sessionManager.startSession(
      phone,
      "treino-digital-614i3z4"
    );
    return await processMessage(message);
  }

  // Reiniciar sessão
  if (sessionId && msg.body === "#restart") {
    console.log("Condição: reiniciar sessão");
    sessionManager.delete(phone);
    return;
  }

  // Adicionar nova tarefa
  if (!sessionId && msg.body === "#n") {
    console.log("Condição: adicionar nova tarefa");
    const message = await sessionManager.startSession(
      phone,
      "create-reminder-jv67tbx"
    );
    return await processMessage(message);
  }

  // Usuário sem sessão mas com mensagem citada
  if (!sessionId && msg.hasQuotedMsg) {
    return await handleQuotedMessage(msg);
  }

  // Usuário em sessão normal
  if (sessionId) {
    console.log("Condição: usuário em sessão normal");
    const message = await sessionManager.continueSession(phone, msg.body);
    if (message) {
      return await processMessage(message);
    }
  }

  // Caso não esteja em nenhuma sessão nem use palavra-chave
  console.log("Condição: usuário sem sessão e sem palavra-chave");
  return "Selecione a opção e mande a palavra-chave:\n\n#n - Para criar uma nova tarefa";
};

export { treatRecivedMessage, endSession };
