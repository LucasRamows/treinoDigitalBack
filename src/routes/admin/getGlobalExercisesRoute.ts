import express from "express";
import getGlobalExercises from "../../modules/gets/getGlobalExercises";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.get("/get-all-global-exercises", async (req, res) => {
  const exercise = await getGlobalExercises();
  res.json(exercise);
});
export default router