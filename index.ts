//imports
import express from "express";
import cors from "cors";
import publicRoutes from "./src/routes/public";

//consts
const app = express();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//basics
app.use(express.json());
app.use(cors());
app.use("/", publicRoutes);
// app.use("/", auth, privateRoutes);
// app.use("/", auth, adminRoutes);


//output
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

