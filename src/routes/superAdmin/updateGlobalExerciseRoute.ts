import express from "express";
import updateGlobalExercise from "../../modules/updates/updateGlobalExercise";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.put("/update-global-exercise/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const {name, image, description} = req.body;
    const users = await updateGlobalExercise(id, name?name:undefined, image?image:undefined, description?description:undefined);
  res.json(users);
});
export default router