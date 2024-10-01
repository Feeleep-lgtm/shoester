import { Router } from "express";
import { authenticate, authorize } from "../Middleware/auth.js";
import { addToCart, checkout, removeFromCart } from "../controllers/cart.js";

const cart = Router();

cart.post("/", authenticate, authorize("BUYER"), addToCart);
cart.get("/", authenticate, authorize("BUYER"), checkout);
cart.delete("/:id", authenticate, authorize("BUYER"), removeFromCart);
export default cart;
