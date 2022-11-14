import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { apiPaths } from "./interface/paths.interface";
import dbConnetion from "./database/database";
import autheticationRouter from "./routers/auth.router";

dotenv.config();
dbConnetion();
const port = process.env.PORT || 3000;

export const app: Express = express();
const apiParhs: apiPaths = {
  authentication: "/api/authentication",
};

app.use(express.json());
app.use(cors());

app.use(apiParhs.authentication, autheticationRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to API Bloom", version: "2.0.0" });
});

app.listen(port, () => {
  console.log(`Server initialized on port ${port}`);
});
