import express from "express";
import deleteUser from "../../modules/deletes/deleteUser";

const router = express.Router();

router.use(express.json());

router.delete("/delete-user", async (req, res) => {
  const { id } = req.body
  const user = await deleteUser(id?id:undefined);
  res.json(user);
});
export default router