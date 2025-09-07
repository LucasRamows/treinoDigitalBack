import { sendMessage } from "../../app";
import getAndDeleteTodayReminders from "../../src/modules/gets/getTodayReminders";
import { SessionManager } from "../sessionManagers";
import extractMessages from "./extractMessages";
import formatPhone from "./formats/formatPhone";


const sessionManager = new SessionManager();

const whatsAppGetReminder = async () => {
  const reminders = await getAndDeleteTodayReminders();

  for (let reminder of reminders) {
    console.log("no reminder", reminder);
    const message = {
      name: reminder.tasks.name,
      date: reminder.tasks.date,
    };
    // envia a reminder via SessionManager
    const mess = await sessionManager.startSession(
      JSON.stringify(message),
      "reminder-v20x6b6"
    );

    if (mess) {
      const formatted = extractMessages(mess);
      console.log("no mes", formatted);

      await sendMessage(formatPhone(reminder.tasks.user.phone), formatted);
    }
  }
};

export default whatsAppGetReminder;
