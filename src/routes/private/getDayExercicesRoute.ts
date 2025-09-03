import express from "express";
import getDayExercices from "../../modules/gets/getDayExercise";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.post("/get-day-exercises", async (req, res) => {
  const { id, phone } = req.body
  const exercise = await getDayExercices(id?id:undefined, phone?phone:undefined);
  res.json(exercise);
});
export default router