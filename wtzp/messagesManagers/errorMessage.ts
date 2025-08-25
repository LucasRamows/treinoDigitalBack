import { sendMessage } from "../app"

function errorMessage(phone:string) {
    const Message = "Perdão! Para dar inicio ao seu treino envie #treino."

  sendMessage(phone, Message);
}

export default errorMessage
