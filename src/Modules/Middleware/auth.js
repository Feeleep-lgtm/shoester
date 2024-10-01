import jwt from "jsonwebtoken";
import { prisma } from "../../../app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const jwtKey = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtKey);
    const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
    if (!user) {
      res.status(409).json("Unauthorized");
    }
    req.user = user;

    next();
  } catch (err) {
    next(err);
    //res.status(400).json({ message: "Invalid Token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
