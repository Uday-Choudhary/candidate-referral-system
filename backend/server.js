import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import candidateRoutes from './routes/candidates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Performance Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev')); // Use 'combined' for production

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/candidates', candidateRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message || 'Something went wrong!' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDB Connected'))
    .catch((error) => console.log('MongoDB Connection Error:', error));

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));