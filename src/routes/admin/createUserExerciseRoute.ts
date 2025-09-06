import express from "express";
import createUserExercise from "../../modules/post/createUserExercise";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.post("/create-user-exercise", async (req, res) => {
  const { userId, exerciseId, weight, day} = req.body;
  const newUserExercise = await createUserExercise(userId, exerciseId, weight, day);
  res.json(newUserExercise);
});
export default router