import { Router } from "express";
import {
  addShoe,
  deleteShoe,
  getAllShoes,
  getAllShoesBySeller,
  getOneSellerShoe,
  getShoeById,
  searchShoe,
  updateShoe,
} from "../controllers/shoe.js";
import { authenticate, authorize } from "../Middleware/auth.js";

const shoe = Router();

shoe.post("/", authenticate, authorize("SELLER"), addShoe);
shoe.get("/shoes", authenticate, getAllShoes);
shoe.get(
  "/seller-shoes",
  authenticate,
  authorize("ADMIN", "SELLER"),
  getAllShoesBySeller
);
shoe.get("/:id", authenticate, getShoeById);
shoe.get("/seller/:id", authenticate, getOneSellerShoe);
shoe.put("/:id", authenticate, authorize("ADMIN", "SELLER"), updateShoe);
shoe.delete("/:id", authenticate, authorize("ADMIN", "SELLER"), deleteShoe);
shoe.get("/search", authenticate, authorize("BUYER"), searchShoe);

export default shoe;
