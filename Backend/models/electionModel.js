import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["upcoming", "active", "stopped", "completed"],
            default: "upcoming",
        },

        candidates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Candidate",
            },
        ],
    },
    { timestamps: true }
);

const Election = mongoose.model("Election", electionSchema);
export default Election;
