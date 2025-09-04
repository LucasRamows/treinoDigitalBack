import { Router } from "express";
import getGlobalExercises from "./admin/getGlobalExercisesRoute"
import createUserExercise from "./admin/createUserExerciseRoute"


const router = Router();

router.use(getGlobalExercises);
router.use(createUserExercise);

export default router;
