import express from "express";
import createUser from "../../modules/creates/createUser";

const router = express.Router();
router.use(express.json());

router.post("/create-user", async (req, res) => {
  try {
    const { name, email, birthDay, phone, key, role } = req.body;

    const user = await createUser(
      name,
      email,
      birthDay,   // agora vai pro lugar certo
      phone,
      key,
      role ?? undefined
    );

    res.json(user);
  } catch (error: any) {
    console.error("Erro na rota /create-user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
