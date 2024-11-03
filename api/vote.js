const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Mongoose-Modelle hier importieren oder definieren
const Code = require('../models/Code');  // Importiere dein Code-Modell
const Vote = require('../models/Vote');    // Importiere dein Vote-Modell
const Result = require('../models/Result'); // Importiere dein Result-Modell

router.post('/', async (req, res) => {
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

module.exports = router;
