import express from "express";
import deleteTasks from "../../modules/deletes/deleteTask";

const router = express.Router();

router.use(express.json());

router.delete("/delete-task", async (req, res) => {
  const { id } = req.body
  const task = await deleteTasks(id?id:undefined);
  res.json(task);
});
export default router