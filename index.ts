//imports
import cors from "cors";
import express from "express";
import publicRoutes from "./src/routes/public";
import privateRoutes from "./src/routes/private";
import adminRoutes from "./src/routes/admin";
import superAdminRoutes from "./src/routes/superAdmin";
import getTodayRemindersRoute from "./src/routes/private/getTodayRemindersRoutes";

// middlewares
import auth from "./src/middlewares/auth";
import authAdmin from "./src/middlewares/authAdmin";
import authSuperAdmin from "./src/middlewares/authSuperAdmin";

//consts
const app = express();
const PORT = 3000;

//basics
app.use(express.json());
app.use(cors());

// rotas públicas (sem token)
app.use("/public", publicRoutes);

// rotas privadas (usuário logado)
app.use("/private", auth, privateRoutes);

// rotas apenas admin
app.use("/admin", authAdmin, adminRoutes);

// rotas apenas superadmin
app.use("/superadmin", authSuperAdmin, superAdminRoutes);

// lembretes do dia (usuário logado)
app.use("/reminders", auth, getTodayRemindersRoute);

//output
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
