import { Router } from "express";
import createUserRoute from "../routes/public/createUserRoute"
import loginUserRoute from "../routes/public/loginRoute"


const router = Router();

router.use(createUserRoute);
router.use(loginUserRoute);


export default router;