const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Vote = require('./models/Vote'); // Importiere dein Voting-Modell hier
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Verbunden mit MongoDB'))
.catch(err => console.error('Verbindungsfehler mit MongoDB:', err));

// POST-Route für Abstimmungen
app.post('/vote', async (req, res) => {
    const { code, voteOption } = req.body;
    
    try {
        const newVote = new Vote({ code, voteOption });
        await newVote.save();
        res.status(200).json({ message: "Stimme erfolgreich abgegeben!" });
    } catch (error) {
        console.error("Fehler beim Speichern der Stimme:", error);
        res.status(500).json({ message: "Fehler beim Speichern der Stimme." });
    }
});

// GET-Route für das Abrufen von Ergebnissen
app.get('/results', async (req, res) => {
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

// Statische Dateien bereitstellen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server-Export für Vercel
module.exports = app;


