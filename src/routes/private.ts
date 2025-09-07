import { Router } from "express";
import getTodayRemindersRoute from "../routes/private/getTodayRemindersRoutes";
import updateTaskById from "../routes/private/updateTaskByIdRoute";
import createTask from "./private/createTaskRoute";
import getDayExercise from "./private/getDayExercicesRoute";
import deleteUserRoute from "./private/deleteUserRoute";
import getUser from "./private/getUserRoute";
import updateUserExercise from "./private/updateUserExerciseRoute";
import updateUser from "./private/updateUserRoute";

const router = Router();

router.use(getDayExercise);
router.use(updateUser);
router.use(updateUserExercise);
router.use(createTask);
router.use(getUser);
router.use(updateTaskById);
router.use(getTodayRemindersRoute);
router.use(deleteUserRoute);

export default router;
