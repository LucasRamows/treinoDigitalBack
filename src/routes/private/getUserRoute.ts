import express from "express";
import getUser from "../../modules/gets/getUser";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.get("/get-user", async (req, res) => {
    const { phone, email, hasExercise} = req.body
    const exercise = await getUser(phone, email, hasExercise);
    res.json(exercise);
});
export default router