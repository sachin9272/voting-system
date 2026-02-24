import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Candidate from "../models/candidateModel.js";

// 🔐 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 📝 Register Voter (with Aadhar upload)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const aadharFront = req.files?.aadharFront
      ? `/uploads/${req.files.aadharFront[0].filename}`
      : "";
    const aadharBack = req.files?.aadharBack
      ? `/uploads/${req.files.aadharBack[0].filename}`
      : "";

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      aadharFront,
      aadharBack,
      role: "voter",
      isVerified: false,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔑 Login User (Voter or Admin)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if candidate first
    const candidate = await Candidate.findOne({ email }).populate("election", "title status");
    if (candidate) {
      const bcrypt = await import("bcryptjs");
      const match = await bcrypt.default.compare(password, candidate.password);
      if (match) {
        return res.json({
          _id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          role: "candidate",
          party: candidate.party,
          partySymbol: candidate.partySymbol,
          photo: candidate.photo,
          election: candidate.election,
          token: generateToken(candidate._id),
        });
      }
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👤 Get Logged In User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────
// 🔐  ADMIN – Voter Management
// ─────────────────────────────────────────────

/** GET /api/auth/voters  – list all voters */
export const getVoters = async (req, res) => {
  try {
    const voters = await User.find({ role: "voter" }).select("-password").sort({ createdAt: -1 });
    res.json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** PUT /api/auth/voters/:id/verify  – verify a voter */
export const verifyVoter = async (req, res) => {
  try {
    const voter = await User.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: "Voter not found" });

    voter.isVerified = true;
    await voter.save();
    res.json({ message: "Voter verified successfully", voter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** PUT /api/auth/voters/:id/reject  – reject/unverify a voter */
export const rejectVoter = async (req, res) => {
  try {
    const voter = await User.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: "Voter not found" });

    voter.isVerified = false;
    await voter.save();
    res.json({ message: "Voter rejected", voter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
