//imports
import express from "express";
import cors from "cors";
import publicRoutes from "./src/routes/public";
import privateRoutes from "./src/routes/private";
import adminRoutes from "./src/routes/admin";
import superAdminRoutes from "./src/routes/superAdmin";
import getTodayRemindersRoute from "./wtzp/modules/sendReminder/getTodayRemindersRoutes";
import whatsAppGetReminder from "./wtzp/modules/sendReminder/whatsAppGetReminder";

//consts
const app = express();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//basics
app.use(express.json());
app.use(cors());
app.use("/", publicRoutes);
app.use("/", privateRoutes);
app.use("/", adminRoutes);
app.use("/", superAdminRoutes);
app.use("/", getTodayRemindersRoute);



//output
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

whatsAppGetReminder()