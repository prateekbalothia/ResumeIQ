import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },

        atsScore: Number,

        matchingSkills: [String],

        missingSkills: [String],

        strengths: [String],

        weaknesses: [String],

        suggestions: [String],

        interviewQuestions: [String],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Analysis", analysisSchema);