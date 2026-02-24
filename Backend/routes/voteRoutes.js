import express from "express";
import { castVote, getMyVotes } from "../controllers/voteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cast", protect, castVote);
router.get("/my-votes", protect, getMyVotes);

export default router;
