import { stringify } from "querystring";
import formatPhone from "../modules/treatData/formatPhone";
import api from "./api"; // o axios.create que você fez

interface UserSession {
  sessionId: string;
}

interface TypebotMessage {
  id: string;
  type: string;
  content: any;
}

interface StartChatResponse {
  sessionId: string;
  messages: TypebotMessage[];
}

interface ContinueChatResponse {
  messages: TypebotMessage[];
}

export class Users {
  private users: Record<string, UserSession>;

  constructor() {
    this.users = {};
  }

  async addUser(id: string): Promise<TypebotMessage[] | false> {
    try {
      const response = await api.post<StartChatResponse>(
        `/typebots/treino-digital-614i3z4/startChat`,
        {
          message: formatPhone(id),
          type: "text",
        }
      );

      const data = response.data;

      this.users[id] = {
        sessionId: data.sessionId,
      };

      return data.messages;
    } catch (error) {
      console.error("Erro ao add User:", error);
      return false;
    }
  }
    async addTask(id: string): Promise<TypebotMessage[] | false> {
    try {
      const response = await api.post<StartChatResponse>(
        `/typebots/create-reminder-jv67tbx/startChat`,
        {
          message: formatPhone(id),
          type: "text",
        }
      );

      const data = response.data;

      this.users[id] = {
        sessionId: data.sessionId,
      };

      return data.messages;
    } catch (error) {
      console.error("Erro ao add User:", error);
      return false;
    }
  }
async sendReminder(reminder: any): Promise<TypebotMessage[] | false> {
  try {
    const phone = reminder?.tasks?.user?.phone;

    if (!phone) {
      console.error("Telefone não encontrado no reminder:", reminder);
      return false;
    }

    const response = await api.post<StartChatResponse>(
      `/typebots/reminder-v20x6b6/startChat`,
      {
        message: JSON.stringify(reminder),
        type: "text",
      }
    );

    const data = response.data;
    console.log("phone", phone);

    // registra session
    this.users[phone] = { sessionId: data.sessionId };

    return data.messages;
  } catch (error) {
    console.error("Erro ao add User:", error);
    return false;
  }
}
  async getStep(
    id: string,
    msg: string
  ): Promise<TypebotMessage[] | undefined> {
    try {
      const session = this.users[id];
      if (!session) throw new Error("Usuário não encontrado!");

      const response = await api.post<ContinueChatResponse>(
        `/sessions/${session.sessionId}/continueChat`,
        {
          message: msg,
          type: "text",
        }
      );

      const data = response.data;

      return data.messages;
    } catch (e) {
      console.log("Erro ao pegar msg do flow", e);
    }
  }
  async delete(id: string) {
    delete this.users[id];
  }

  find(id: string): string | null {
    const session = this.users[id];
    return session ? session.sessionId : null;
  }
}
