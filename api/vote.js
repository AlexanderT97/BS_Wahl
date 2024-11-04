const express = require('express');
const Vote = require('../models/Vote'); // Importiere dein Vote-Modell

const router = express.Router();

router.post('/', async (req, res) => {
    const { code, voteOption } = req.body;

    // Hier kommt die Logik für das Abstimmen, z.B.:
    try {
        const newVote = new Vote({ voteOption, code });
        await newVote.save();
        res.status(201).json({ message: "Stimme erfolgreich abgegeben." });
    } catch (error) {
        console.error("Fehler beim Abgeben der Stimme:", error);
        res.status(500).json({ message: "Fehler beim Abgeben der Stimme." });
    }
});

module.exports = router;
