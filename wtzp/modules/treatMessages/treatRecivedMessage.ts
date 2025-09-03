import updateTask from "../../../src/modules/updates/updateTask";
import { Users } from "../../sessionsManagers/sessionManagers";
import formatPhone from "../treatData/formatPhone";
import extractMessages from "./extractMessages";

const users = new Users();

// Função para processar a mensagem com extractMessages
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

    const msgParts = quoted.body.split(" ");
    const msgName = quoted.body.split(":")[1]?.trim();
    const date = msgParts[2];
    const phone = formatPhone(msg.from);

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
const endSession = async (id: any) => {
  const phone = await formatPhone(formatPhone(id))
  console.log("phone",phone.trim(),"daskd")
  users.delete(phone.trim());
  return
};
const treatRecivedMessage = async (msg: any) => {
  const session = users.find(msg.from);

  // Condição: novo usuário sem mensagem citada
  if (session === null && msg.body === "#treino") {
    console.log("Condição: novo usuário sem mensagem citada");
    const message = await users.addUser(msg.from);
    return await processMessage(message);
  }

  // Condição: reiniciar sessão
  if (session !== null && msg.body === "#restart") {
    console.log("Condição: reiniciar sessão");
    users.delete(msg.from);
    console.log("from", msg.from);
    return;
  }

  // Condição: adicionar nova tarefa
  if (session === null && msg.body === "#n") {
    console.log("Condição: adicionar nova tarefa");
    const message = await users.addTask(msg.from);
    return await processMessage(message);
  }

  // Condição: usuário sem sessão mas com mensagem citada
  if (session === null && msg.hasQuotedMsg) {
    return await handleQuotedMessage(msg);
  }

  // Condição: usuário em sessão normal
  console.log("Condição: usuário em sessão normal");
  const message = await users.getStep(msg.from, msg.body);
  if (message !== undefined) {
    return await processMessage(message);
  }
};

export { treatRecivedMessage,endSession };
