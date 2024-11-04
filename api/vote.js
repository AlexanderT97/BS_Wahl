const express = require('express');
const Vote = require('../models/Vote'); // Importiere dein Vote-Modell

const router = express.Router();

router.post('/', async (req, res) => {
    const { code, voteOption } = req.body;

    try {
        // Hier kommt die Logik für das Abstimmen
        const newVote = new Vote({ voteOption, code });
        await newVote.save();
        res.status(201).json({ message: "Abstimmung erfolgreich!" });
    } catch (error) {
        console.error("Fehler beim Abstimmen:", error);
        res.status(500).json({ message: "Fehler beim Abstimmen." });
    }
});

module.exports = router;
