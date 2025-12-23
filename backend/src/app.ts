import express from "express";
import cors from "cors"
import routes from "./route/index.js";


const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.use("/api/v1", routes)

export default app;
