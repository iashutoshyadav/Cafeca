const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const reservationRoutes = require('./routes/reservationRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

app.use('/api/reservations', reservationRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/', (req, res) => {
    res.send('Aura Cafe API is running...');
});

// Connect to MongoDB
// Note: Replace the empty string below with your actual MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auracafe';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
