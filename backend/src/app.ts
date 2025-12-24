import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import routes from "./route/index.js";
import path from "path";


const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadPath = path.join(process.cwd(), "uploads");

console.log("Serving files from:", uploadPath);

app.use("/uploads", express.static(uploadPath));

app.get("/", (_req : Request, res : Response) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.use("/api/v1", routes)

export default app;
