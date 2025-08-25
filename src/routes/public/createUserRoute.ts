import express from "express";
import createUser from "../../modules/creates/createUser";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.post("/create-user", async (req, res) => {
  const { name, email, weigth, birthDay, phone, key, role } = req.body;
  const user = await createUser(name, email, weigth, birthDay,  phone, key, role?role:undefined);
  res.json(user);
});
export default router