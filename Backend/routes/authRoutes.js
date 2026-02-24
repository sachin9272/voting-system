import express from "express";
import multer from "multer";
import path from "path";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getVoters,
  verifyVoter,
  rejectVoter,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config for Aadhar uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Public
router.post(
  "/register",
  upload.fields([{ name: "aadharFront", maxCount: 1 }, { name: "aadharBack", maxCount: 1 }]),
  registerUser
);
router.post("/login", loginUser);

// Protected
router.get("/profile", protect, getUserProfile);

// Admin — voter management
router.get("/voters", protect, adminOnly, getVoters);
router.put("/voters/:id/verify", protect, adminOnly, verifyVoter);
router.put("/voters/:id/reject", protect, adminOnly, rejectVoter);

export default router;
