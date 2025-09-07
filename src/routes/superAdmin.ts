import { Router } from "express";
import createExerciseRoute from "./superAdmin/createExerciseRoute";
import updateGlobalExercise from "./superAdmin/updateGlobalExerciseRoute";
import endSessionRoute from "./superAdmin/endSessionRoute";
import deleteAllReminders from "./superAdmin/deleteTasksRoute";
import getAllUsers from "./superAdmin/getAllUsersRoute";
import updateManyExercises from "./superAdmin/updateManyUserExercisesRoute";
import authSuperAdmin from "../middlewares/authSuperAdmin";

const router = Router();

router.use(authSuperAdmin);

router.use(getAllUsers);
router.use(createExerciseRoute);
router.use(endSessionRoute);
router.use(updateGlobalExercise);
router.use(deleteAllReminders);
router.use(updateManyExercises);

export default router;
