import { Router } from "express";
import createUserRoute from "../routes/public/createUserRoute"
import createExerciseRoute from "../routes/superAdmin/createExerciseRoute"
import getAllUsers from "../routes/superAdmin/getAllUsersRoute"
import createUserExercise from "./admin/createUserExerciseRoute"
import getGlobalExercises from "./admin/getGlobalExercisesRoute"
import updateGlobalExercise from "./superAdmin/updateGlobalExerciseRoute"
import getDayExercise from "./private/getDayExercicesRoute"
import updateUser from "./private/updateUserRoute"
import updateUserExercise from "./private/updateUserExerciseRoute"
import updateManyExercises from "./superAdmin/updateManyUserExercisesRoute"
import createTask from "./private/createTaskRoute"
import deleteAllReminders from "./superAdmin/deleteTasksRoute"


const router = Router();

router.use(getGlobalExercises);

export default router;
