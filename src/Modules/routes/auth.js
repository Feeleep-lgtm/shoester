import { Router } from "express";
import { login, me, signup } from "../controllers/auth.js";
import { googleSignup } from "../controllers/authController.js";
import { authenticate } from "../Middleware/auth.js";

const auth = Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.get("/me", authenticate, me);
auth.post("/google-signup", googleSignup);

export default auth;
