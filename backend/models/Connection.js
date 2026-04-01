import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
    relationType: {
        type: String,
        required: true,
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concept',
        required: true,
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concept',
        required: true,
    }
}, {
    timestamps: true,
});

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;