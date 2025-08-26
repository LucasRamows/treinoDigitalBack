import { Users } from "../../sessionsManagers/sessionManagers";
import formatFirstMessage from "../treatData/formatFirstMessage";
import extractMessages from "./extractMessages";
const users = new Users();

const treatRecivedMessage = async (msg: any) => {
  const session = users.find(msg.from);
  if (session === null) {
    const message = await users.addUser(msg.from);
    const retorno = await extractMessages(message ? message : []);
    return retorno;
  } else if (session !== null && msg.body === "#restart") {
    users.delete(msg.from)
  } else {
    const message = await users.getStep(msg.from, msg.body);
    if (message !== undefined) {
      const retorno = await extractMessages(message);
      return retorno;
    }
  }
};

export default treatRecivedMessage;
