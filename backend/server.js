import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import canvasRouter from './routes/canvas.routes.js';
import conceptRouter from './routes/concept.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const startServer = async () => {
    await connectDB();

    app.use('/api/canvases', canvasRouter);
    app.use('/api/concepts', conceptRouter);

    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
