import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import candidateRoutes from './routes/candidates.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/candidates', candidateRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/candidateDB')
    .then(() => console.log(' MongoDB Connected'))
    .catch((error) => console.log('MongoDB Connection Error:', error));

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));