import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
}, { timestamps: true });

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
    notes: {
        type: [noteSchema],
        default: [],
    }
}, {
    timestamps: true,
});

const Concept = mongoose.model('Concept', conceptSchema);

export default Concept;