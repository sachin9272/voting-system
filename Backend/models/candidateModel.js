import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        party: {
            type: String,
            required: true,
        },

        partySymbol: {
            type: String, // URL / path to party symbol image
            default: "",
        },

        photo: {
            type: String, // URL / path to candidate photo
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        election: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Election",
            required: true,
        },

        voteCount: {
            type: Number,
            default: 0,
        },

        isVerified: {
            type: Boolean,
            default: true, // Admin adds candidates directly, they are verified
        },
    },
    { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
