import api from "./api";


interface Session {
  sessionId: string;
}

interface TypebotMessage {
  id: string;
  type: string;
  content: any;
}

export class SessionManager {
  private sessions: Record<string, Session> = {};

  async startSession(id: any, typebotEndpoint: string): Promise<TypebotMessage[] | false> {
    try {
      const response = await api.post(`/typebots/${typebotEndpoint}/startChat`, {
        message: id,
        type: "text",
      });

      const data = response.data;
      this.sessions[id] = { sessionId: data.sessionId };
      return data.messages;
    } catch (err) {
      console.error("Erro ao iniciar sessão:", err);
      return false;
    }
  }

  async continueSession(id: string, msg: string): Promise<TypebotMessage[] | undefined> {
    try {
      const session = this.sessions[id];
      if (!session) throw new Error("Sessão não encontrada!");

      const response = await api.post(`/sessions/${session.sessionId}/continueChat`, {
        message: msg,
        type: "text",
      });

      return response.data.messages;
    } catch (err) {
      console.error("Erro ao continuar sessão:", err);
    }
  }

  delete(id: string) {
    delete this.sessions[id];
  }

  find(id: string): string | null {
    return this.sessions[id]?.sessionId || null;
  }
}
