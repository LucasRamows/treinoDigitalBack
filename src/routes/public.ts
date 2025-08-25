import { Router } from "express";
import createUserRoute from "../routes/public/createUserRoute"
import createExerciseRoute from "../routes/superAdmin/createExerciseRoute"
import getAllUsers from "../routes/superAdmin/getAllUsersRoute"
import createUserExercise from "./admin/createUserExerciseRoute"
import getGlobalExercises from "./admin/getGlobalExercisesRoute"
import updateGlobalExercise from "./superAdmin/updateGlobalExerciseRoute"
import getDayExercise from "./private/getDayExercicesRoute"
import updateUser from "./private/updateUserRoute"

const router = Router();

router.use(createUserRoute);
router.use(createExerciseRoute);
router.use(getAllUsers);
router.use(createUserExercise);
router.use(getGlobalExercises);
router.use(updateGlobalExercise);
router.use(getDayExercise);
router.use(updateUser);

export default router;