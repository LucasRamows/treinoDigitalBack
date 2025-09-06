import express from "express";
import loginUser from "../../modules/post/login";

const router = express.Router();
router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      key        
    } = req.body;

    const user = await loginUser(
      email,
      key
    );

    res.json(user);
  } catch (error: any) {
    console.error("Erro na rota /create-user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
