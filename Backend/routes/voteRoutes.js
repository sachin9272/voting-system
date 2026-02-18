import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Vote API Working" });
});

export default router;
