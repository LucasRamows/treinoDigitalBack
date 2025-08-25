import express from "express";
import getAllUsers from "../../modules/gets/getAllUsers";

//consts
const router = express.Router();

//basics
router.use(express.json());


router.get("/get-all-users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});
export default router