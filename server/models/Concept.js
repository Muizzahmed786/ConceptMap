import mongoose from "mongoose";

const conceptSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default : ""
    },
    tags: {
        type: [String],
        default: [],
        required: true,
    },
    understandingLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
        required: true,
    },
}, {
    timestamps: true,
});

const Concept = mongoose.model('Concept', conceptSchema);

export default Concept;