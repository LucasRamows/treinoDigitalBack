import { sendMessage } from "../../../app";
import extractMessages from "../../../wtzp/modules/extractMessages";
import formatPhone from "../../../wtzp/modules/formats/formatPhone";
import { SessionManager } from "../../../wtzp/sessionManagers";
import deleteReminderById from "../deletes/deleteReminderById";
import getTodayReminders from "../gets/getTodayReminders";

const sessionManager = new SessionManager();

const getListReminder = async () => {
  const reminders = await getTodayReminders();
  for (let reminder of reminders) {
    const message = {
      name: reminder.tasks.name,
      date: reminder.tasks.date,
    };
    const mess = await sessionManager.startSession(
      JSON.stringify(message),
      "reminder-v20x6b6"
    );

    if (mess) {
      const formatted = await extractMessages(mess);
      console.log(formatted)
      if(formatted){
        for (let i = 0;  i < formatted.length; i++) {
        await sendMessage(formatPhone(reminder.tasks.user.phone), formatted[i]);
      }
      }
    }
    deleteReminderById(reminder.id);
  }
};

export default getListReminder;
