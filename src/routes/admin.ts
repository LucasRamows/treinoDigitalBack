import { Router } from "express";
import getGlobalExercises from "./admin/getGlobalExercisesRoute"
import createUserExercise from "./admin/createUserExerciseRoute"
import authAdmin from "../middlewares/authAdmin";


const router = Router();

router.use(getGlobalExercises);
router.use(createUserExercise);

export default router;
