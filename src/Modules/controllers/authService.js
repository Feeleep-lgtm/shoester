import admin from "../configurations/firebase.js";
import jwt from "jsonwebtoken";
//import { prisma } from "../../app.js";

export const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const findOrCreateUser = async (userData) => {
  const { uid, email } = userData;

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("User already exists");
  }

  // If user doesn't exist, create a new user
  user = await prisma.user.create({
    data: {
      id: uid,
      email,
    },
  });

  return user;
};

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("No user found with this email");
  }

  return user;
};
