const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public')); // Statische Dateien

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Verbunden mit MongoDB'))
    .catch(err => console.error('Fehler bei der Verbindung mit MongoDB:', err));

// Routen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sende die HTML-Datei
});

app.post('/vote', async (req, res) => {
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

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
