import { Router } from "express";
import createUserRoute from "../routes/public/createUserRoute"


const router = Router();

router.use(createUserRoute);


export default router;