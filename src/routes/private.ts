import { Router } from "express";
import getDayExercise from "./private/getDayExercicesRoute"
import updateUser from "./private/updateUserRoute"
import updateUserExercise from "./private/updateUserExerciseRoute"
import createTask from "./private/createTaskRoute"
import getUser from "./private/getUserRoute"
import updateTaskById from "../routes/private/updateTaskByIdRoute";


const router = Router();

router.use(getDayExercise);
router.use(updateUser);
router.use(updateUserExercise);
router.use(createTask);
router.use(getUser);
router.use(updateTaskById);

export default router;