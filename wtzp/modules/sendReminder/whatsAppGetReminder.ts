import { sendMessage } from "../../../app";
import { Users } from "../../sessionsManagers/sessionManagers";
import formatFirstMessage from "../treatData/formatFirstMessage";
import formatPhone from "../treatData/formatPhone";
import extractMessages from "../treatMessages/extractMessages";
import getTodayReminders from "./getTodayReminders";
const users = new Users();
const whatsAppGetReminder = async () => {
  const reminders = await getTodayReminders();

  for (let reminder of reminders) {
    console.log("no reminder", reminder);

    const mess = await users.sendReminder(reminder);

    if (mess) {
      console.log("no mes", extractMessages(mess));

       await sendMessage(
          formatPhone(reminder.tasks.user.phone),
          extractMessages(mess)
        );
    }
  }
};

export default whatsAppGetReminder;
