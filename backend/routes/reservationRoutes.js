const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const { name, phone, date, time, guests } = req.body;
        
        const newReservation = new Reservation({
            name,
            phone,
            date,
            time,
            guests
        });

        const savedReservation = await newReservation.save();
        res.status(201).json({ message: 'Reservation created successfully!', reservation: savedReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Failed to create reservation.' });
    }
});

// Get all reservations (for admin use)
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reservations.' });
    }
});

module.exports = router;
