import express from "express";
import getDayExercices from "../../modules/gets/getDayExerciseByPhone";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.post("/get-day-exercise-phone", async (req, res) => {
  const { phone } = req.body
  const exercise = await getDayExercices(phone?phone:undefined);
  res.json(exercise);
});
export default router