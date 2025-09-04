import express from "express";
import createUser from "../../modules/creates/createUser";
import { WorkoutType } from "@prisma/client";

const router = express.Router();
router.use(express.json());

router.post("/create-user", async (req, res) => {
  try {
    const {
      name,
      email,
      birthDay,
      phone,
      key,
      role,
      workoutType,      
      frequency,      
      frequencyYear,    
      weight,         
      height,         
    } = req.body;

    const user = await createUser(
      name,
      email,
      birthDay,
      phone,
      key,
      role ?? undefined,
      workoutType as WorkoutType | undefined,
      frequency,
      frequencyYear,
      weight,
      height
    );

    res.json(user);
  } catch (error: any) {
    console.error("Erro na rota /create-user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
