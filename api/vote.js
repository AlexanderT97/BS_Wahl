const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote'); // Dein Voting-Modell importieren

// POST-Route für Abstimmungen
router.post('/', async (req, res) => {
    const { code, voteOption } = req.body;
    
    // Hier kannst du die Logik für das Speichern der Abstimmung hinzufügen
    // Beispiel: Speichere die Stimme in der Datenbank
    try {
        const newVote = new Vote({ code, voteOption });
        await newVote.save();
        res.status(200).json({ message: "Stimme erfolgreich abgegeben!" });
    } catch (error) {
        console.error("Fehler beim Speichern der Stimme:", error);
        res.status(500).json({ message: "Fehler beim Speichern der Stimme." });
    }
});

module.exports = router;

