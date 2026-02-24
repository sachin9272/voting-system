import Vote from "../models/voteModel.js";
import Candidate from "../models/candidateModel.js";
import Election from "../models/electionModel.js";
import User from "../models/userModel.js";

/** POST /api/votes/cast  – cast a vote */
export const castVote = async (req, res) => {
    try {
        const { candidateId, electionId } = req.body;
        const voterId = req.user._id;

        // Check that voter is verified
        const voter = await User.findById(voterId);
        if (!voter.isVerified) {
            return res.status(403).json({ message: "You must be verified by admin before voting." });
        }

        // Check election is active
        const election = await Election.findById(electionId);
        if (!election) return res.status(404).json({ message: "Election not found" });
        if (election.status !== "active") {
            return res.status(400).json({ message: "Voting is not open for this election." });
        }

        // Check already voted
        const alreadyVoted = await Vote.findOne({ voter: voterId, election: electionId });
        if (alreadyVoted) {
            return res.status(400).json({ message: "You have already voted in this election." });
        }

        // Create vote
        await Vote.create({ voter: voterId, candidate: candidateId, election: electionId });

        // Increment candidate vote count
        await Candidate.findByIdAndUpdate(candidateId, { $inc: { voteCount: 1 } });

        // Mark voter as voted for this election
        await User.findByIdAndUpdate(voterId, { $addToSet: { votedElections: electionId } });

        res.json({ message: "Vote cast successfully!" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "You have already voted in this election." });
        }
        res.status(500).json({ message: err.message });
    }
};

/** GET /api/votes/my-votes  – get voter's vote history */
export const getMyVotes = async (req, res) => {
    try {
        const votes = await Vote.find({ voter: req.user._id })
            .populate("candidate", "name party photo partySymbol")
            .populate("election", "title status");
        res.json(votes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
