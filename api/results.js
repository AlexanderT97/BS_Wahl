const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

// GET-Route für das Abrufen von Ergebnissen
router.get('/', async (req, res) => {
    try {
        const results = await Vote.aggregate([
            { $group: { _id: "$voteOption", count: { $sum: 1 } } }
        ]);
        res.status(200).json(results);
    } catch (error) {
        console.error("Fehler beim Abrufen der Ergebnisse:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Ergebnisse." });
    }
});

module.exports = router;

