import express from "express";
import { ContactRoutes } from "./routes/contact.routes";
import { AuthRoutes } from "./routes/auth.routes";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", ContactRoutes);
app.use("/api/auth", AuthRoutes);

export { app };
