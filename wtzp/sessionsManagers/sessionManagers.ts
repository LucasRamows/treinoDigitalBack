export interface SessionData {
  isSession: boolean;
  folders: number;
  step: number;
  flow?: "gym" | "task"; 
  data: Record<string, any>; 
}

class SessionManager {
  private sessions: Record<string, SessionData> = {};

  getSession(chatId: string): SessionData {
    if (!this.sessions[chatId]) {
      this.sessions[chatId] = { isSession: false, folders: 0 , step: 0, data: {} };
    }
    return this.sessions[chatId];
  }

  setSession(chatId: string, data: Partial<SessionData>) {
    this.sessions[chatId] = { ...this.getSession(chatId), ...data };
  }

  resetSession(chatId: string) {
    this.sessions[chatId] = { isSession: false, folders: 0, step: 0, data: {} };
  }
}

export const sessionManager = new SessionManager();