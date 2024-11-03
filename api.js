const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose-Modelle
const Code = mongoose.model('Code');
const Vote = mongoose.model('Vote');
const Result = mongoose.model('Result');

// API-Route zum Abrufen der Codes
router.get('/codes', async (req, res) => {
    try {
        const codes = await Code.find({ used: false });
        res.status(200).json(codes);
    } catch (error) {
        console.error("Fehler beim Abrufen der Codes:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Codes." });
    }
});

// Route für Abstimmung
router.post('/vote', async (req, res) => {
    const { code, voteOption } = req.body;

    if (!code || !voteOption) {
        return res.status(400).json({ message: 'Code und Abstimmungsoption sind erforderlich.' });
    }

    const existingCode = await Code.findOne({ code, used: false });

    if (!existingCode) {
        return res.status(400).json({ message: 'Ungültiger oder bereits verwendeter Code.' });
    }

    const vote = new Vote({ code, voteOption });
    await vote.save();

    await Result.findOneAndUpdate(
        { option: voteOption },
        { $inc: { count: 1 } },
        { upsert: true }
    );

    await Code.updateOne({ code }, { used: true });
    res.status(200).json({ message: 'Stimme erfolgreich abgegeben!' });
});

// Route zum Abrufen der Ergebnisse
router.get('/results', async (req, res) => {
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
