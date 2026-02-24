import Election from "../models/electionModel.js";
import Candidate from "../models/candidateModel.js";
import bcrypt from "bcryptjs";

// ─────────────────────────────────────────────
// 📦  ELECTION CRUD
// ─────────────────────────────────────────────

/** GET /api/elections */
export const getElections = async (req, res) => {
    try {
        const elections = await Election.find()
            .populate("candidates", "name party partySymbol photo voteCount")
            .sort({ createdAt: -1 });
        res.json(elections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** GET /api/elections/:id */
export const getElectionById = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id).populate(
            "candidates",
            "name party partySymbol photo bio voteCount"
        );
        if (!election) return res.status(404).json({ message: "Election not found" });
        res.json(election);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** POST /api/elections  (Admin only) */
export const createElection = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;

        const election = await Election.create({
            title,
            description,
            startDate,
            endDate,
        });

        res.status(201).json(election);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** PUT /api/elections/:id/start  (Admin only) */
export const startElection = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json({ message: "Election not found" });

        election.status = "active";
        await election.save();
        res.json({ message: "Election started", election });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** PUT /api/elections/:id/stop  (Admin only) */
export const stopElection = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json({ message: "Election not found" });

        election.status = "stopped";
        await election.save();
        res.json({ message: "Election stopped", election });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** GET /api/elections/:id/results  (Admin only) */
export const getElectionResults = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id).populate(
            "candidates",
            "name party partySymbol photo voteCount"
        );
        if (!election) return res.status(404).json({ message: "Election not found" });

        const sorted = [...election.candidates].sort(
            (a, b) => b.voteCount - a.voteCount
        );

        const totalVotes = sorted.reduce((sum, c) => sum + c.voteCount, 0);

        res.json({
            election: {
                _id: election._id,
                title: election.title,
                status: election.status,
            },
            totalVotes,
            results: sorted.map((c, i) => ({
                rank: i + 1,
                _id: c._id,
                name: c.name,
                party: c.party,
                partySymbol: c.partySymbol,
                photo: c.photo,
                voteCount: c.voteCount,
                percentage: totalVotes > 0 ? ((c.voteCount / totalVotes) * 100).toFixed(1) : 0,
            })),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** DELETE /api/elections/:id  (Admin only) */
export const deleteElection = async (req, res) => {
    try {
        const election = await Election.findByIdAndDelete(req.params.id);
        if (!election) return res.status(404).json({ message: "Election not found" });
        res.json({ message: "Election deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─────────────────────────────────────────────
// 👥  CANDIDATE CRUD (Admin)
// ─────────────────────────────────────────────

/** POST /api/elections/:id/candidates  (Admin only) */
export const addCandidate = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json({ message: "Election not found" });

        const { name, email, password, party, bio } = req.body;

        // Hash password for candidate login
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const partySymbol = req.files?.partySymbol
            ? `/uploads/${req.files.partySymbol[0].filename}`
            : "";
        const photo = req.files?.photo
            ? `/uploads/${req.files.photo[0].filename}`
            : "";

        const candidate = await Candidate.create({
            name,
            email,
            password: hashedPassword,
            party,
            bio,
            partySymbol,
            photo,
            election: election._id,
        });

        election.candidates.push(candidate._id);
        await election.save();

        res.status(201).json(candidate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** GET /api/elections/:id/candidates */
export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({ election: req.params.id });
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** DELETE /api/candidates/:id  (Admin only) */
export const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });

        // Remove from election
        await Election.findByIdAndUpdate(candidate.election, {
            $pull: { candidates: candidate._id },
        });

        res.json({ message: "Candidate deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
