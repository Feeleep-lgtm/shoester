//import { JWT_SECRET } from "../../secrets.js";
import {
  verifyIdToken,
  findOrCreateUser,
  findUserByEmail,
} from "./authService.js";
export const googleSignup = async (req, res) => {
  const { idToken } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findOrCreateUser(userData, {
      userName,
      fullName,
      userType,
      referralCode,
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    console.error("Token Verification Error:", error);
  }
};

// Google Login Controller
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findUserByEmail(userData.email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Facebook Signup Controller
export const facebookSignup = async (req, res) => {
  const { idToken, userName, fullName, userType, referralCode } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findOrCreateUser(userData, {
      userName,
      fullName,
      userType,
      referralCode,
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Facebook Login Controller
export const facebookLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findUserByEmail(userData.email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Apple Signup Controller
export const appleSignup = async (req, res) => {
  const { idToken, userName, fullName, userType, referralCode } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findOrCreateUser(userData, {
      userName,
      fullName,
      userType,
      referralCode,
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Apple Login Controller
export const appleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const userData = await verifyIdToken(idToken);
    const user = await findUserByEmail(userData.email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
