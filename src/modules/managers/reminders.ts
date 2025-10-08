import { prisma } from "../../../prisma/prisma";
import getListReminder from "./GetListReminder";

const reminders = async (time:number) => {

const HOURS = 1000 * 60 * time;

const isWithinWorkingHours = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 9 && hour < 22){
  return true;
  }else{
    return false;
  }
};

if (isWithinWorkingHours()) {
getListReminder();
}

setInterval(() => {
    if (isWithinWorkingHours()) {
      getListReminder();
    }
  }, HOURS);
};

export default reminders;
