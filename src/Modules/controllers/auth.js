import { prisma } from "../../../app.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res, next) => {
  try {
    const { email, password, fullName, role } = req.body;
    //Check if user exists
    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    }
    //create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashSync(password, 10),
        fullName,
        role,
      },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).header("x-auth-token", token).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "Incorrect email or password" });
    }
    if (!compareSync(password, user.password)) {
      res.status(404).json({ message: "Incorrect email or password" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.json(req.user);
};
