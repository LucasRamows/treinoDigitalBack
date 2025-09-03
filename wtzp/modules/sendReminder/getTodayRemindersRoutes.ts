import express from "express";
import getTodayReminders from "./getTodayReminders";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.get("/get-all-reminders", async (req, res) => {
  const reminders = await getTodayReminders();
  res.json(reminders);
});
export default router