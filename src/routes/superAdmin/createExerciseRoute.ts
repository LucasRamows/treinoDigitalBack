import express from "express";
import createExercise from "../../modules/post/createExercise";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.post("/create-global-exercise", async (req, res) => {
  const { name, description } = req.body;
  const newExercise = await createExercise(name, description);
  res.json(newExercise);
});
export default router