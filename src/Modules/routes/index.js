import { Router } from "express";
import auth from "./auth.js";
import shoe from "./shoe.js";
import cart from "./cart.js";

const router = Router();

router.use("/auth", auth);
router.use("/shoe", shoe);
router.use("/cart", cart);

export default router;
