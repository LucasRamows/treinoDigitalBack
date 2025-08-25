import express from "express";
import updateUser from "../../modules/updates/updateUser";
import { WorkoutType } from "@prisma/client";

const router = express.Router();

// Middleware para ler JSON
router.use(express.json());

// PUT /update-user
router.put("/update-user", async (req, res) => {
    try {
        const {
            id,
            name,
            phone,
            description,
            workoutType,
            weigth,
            key
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID do usuário é obrigatório" });
        }

        const updatedUser = await updateUser(
            id,
            name,
            phone,
            description,
            workoutType as WorkoutType, // cast se necessário
            weigth,
            key
        );

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

export default router;
