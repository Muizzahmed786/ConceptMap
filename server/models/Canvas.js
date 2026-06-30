import mongoose from "mongoose";

const canvasSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    concepts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Concept'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

const Canvas = mongoose.model('Canvas', canvasSchema);

export default Canvas;