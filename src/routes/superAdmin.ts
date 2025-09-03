import { Router } from "express";
import createExerciseRoute from "../routes/superAdmin/createExerciseRoute"
import updateGlobalExercise from "./superAdmin/updateGlobalExerciseRoute"
import endSessionRoute from "./superAdmin/endSessionRoute"
import deleteAllReminders from "./superAdmin/deleteTasksRoute"
import getAllUsers from "../routes/superAdmin/getAllUsersRoute";


const router = Router();

router.use(getAllUsers);
router.use(createExerciseRoute);
router.use(endSessionRoute);
router.use(updateGlobalExercise);
router.use(deleteAllReminders);

export default router;