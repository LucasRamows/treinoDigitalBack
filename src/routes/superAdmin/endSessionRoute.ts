import express from "express";
import { endSession } from "../../../wtzp/modules/treatMessages/treatRecivedMessage";

const router = express.Router();
router.use(express.json());

router.post("/end-session", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    console.log("ID não fornecido");
    return res.status(400).json({ message: "ID não fornecido" });
  }

  try {
    console.log("Finalizando sessão do ID:", id);
    await endSession(id); 
    console.log("Sessão finalizada com sucesso");
    res.status(200).json({ message: "Sessão finalizada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar sessão:", error);
    res.status(500).json({ message: "Erro ao finalizar sessão" });
  }
});

export default router;
