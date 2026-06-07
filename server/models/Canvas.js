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
    ]
}, {
    timestamps: true,
});

const Canvas = mongoose.model('Canvas', canvasSchema);

export default Canvas;