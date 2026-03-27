import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
    await connectDB();

    app.get('/', (req, res) => {
        res.send('Backend Running');
    });

    app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
}

startServer();
