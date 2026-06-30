import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import canvasRouter from './routes/canvas.routes.js';
import conceptRouter from './routes/concept.routes.js';
import connectionRouter from './routes/connection.routes.js';
import authRouter from './routes/auth.routes.js';
import { auth } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.use(cors({
        origin: [process.env.CLIENT_URL, 'http://localhost:5174', 'http://localhost:5173'],
        credentials: true
    }
));


const startServer = async () => {
    await connectDB();

    app.use('/api/canvases', auth, canvasRouter);
    app.use('/api/concepts', auth, conceptRouter);
    app.use('/api/connections', auth, connectionRouter);
    app.use('/api/auth', authRouter);

    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
