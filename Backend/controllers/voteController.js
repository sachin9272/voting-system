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

        // Check assigned election
        if (voter.registeredElections && !voter.registeredElections.includes(electionId)) {
            return res.status(403).json({ message: "You are not registered to vote in this specific election." });
        }

        // Check election is active
        const election = await Election.findById(electionId);
        if (!election) return res.status(404).json({ message: "Election not found" });
        if (election.status !== "active") {
            return res.status(400).json({ message: "Voting is not open for this election." });
        }

        // Fetch candidate to get the role
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });

        const candidateRole = candidate.role;

        // Check if already voted for this role in this election
        const alreadyVoted = await Vote.findOne({ voter: voterId, election: electionId, role: candidateRole });
        if (alreadyVoted) {
            return res.status(400).json({ message: `You have already cast a vote for the ${candidateRole} role.` });
        }

        // Create vote
        await Vote.create({ voter: voterId, candidate: candidateId, election: electionId, role: candidateRole });

        // Increment candidate vote count
        await Candidate.findByIdAndUpdate(candidateId, { $inc: { voteCount: 1 } });

        // We no longer strictly store `votedElections` as a boolean toggle since they might return to vote for other roles.
        // We can just rely on `Vote` database entries to check what roles they voted for.

        res.json({ message: "Vote cast successfully!" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "You have already voted for this role." });
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
