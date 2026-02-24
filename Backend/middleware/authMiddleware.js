import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Candidate from "../models/candidateModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try user first, then candidate
      let user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        req.user.role = user.role; // voter or admin
        return next();
      }

      let candidate = await Candidate.findById(decoded.id).select("-password");
      if (candidate) {
        req.user = candidate;
        req.user.role = "candidate";
        return next();
      }

      return res.status(401).json({ message: "Not authorized, user not found" });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
