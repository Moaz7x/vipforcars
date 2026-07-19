const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.post('/', async (req, res) => {
    try {
        // Generate a custom Trip Number (e.g., VIP-84923)
        const tripNum = 'VIP-' + Math.floor(10000 + Math.random() * 90000);
        
        // Add trip_num to the incoming data
        const bookingData = { ...req.body, trip_num: tripNum };

        // Save to Supabase
        const { data, error } = await supabase
            .from('bookings')
            .insert([bookingData])
            .select();

        if (error) throw error;

        // Send the generated trip number back to the frontend
        res.status(201).json({ success: true, tripNum: tripNum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
