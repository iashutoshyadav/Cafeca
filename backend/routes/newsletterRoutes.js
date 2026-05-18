const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if already subscribed
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Already subscribed!' });
        }

        const newSubscription = new Newsletter({ email });
        await newSubscription.save();
        
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Newsletter error:', error);
        res.status(500).json({ message: 'Subscription failed.' });
    }
});

module.exports = router;
