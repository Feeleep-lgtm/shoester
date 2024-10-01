import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import router from "./src/Modules/routes/index.js";
import session from "express-session";

dotenv.config({ path: ".env" });
const port = process.env.PORT || 3092;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(session({ secret: "sessionisdefined" }));

export const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/", (req, res) => {
  res.send("Testing, testing!");
});

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log("Port is active");
});
