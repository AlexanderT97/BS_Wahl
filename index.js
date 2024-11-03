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

// Mongoose-Modelle
const codeSchema = new mongoose.Schema({ code: { type: String, required: true }, used: { type: Boolean, default: false } });
const Code = mongoose.model('Code', codeSchema);

const voteSchema = new mongoose.Schema({ code: String, voteOption: String });
const Vote = mongoose.model('Vote', voteSchema);

const resultSchema = new mongoose.Schema({ option: String, count: { type: Number, default: 0 } });
const Result = mongoose.model('Result', resultSchema);

// API-Route zum Abrufen der Codes
app.get('/api/codes', async (req, res) => {
    try {
        const codes = await Code.find({ used: false }); // Nur unbenutzte Codes abrufen
        res.status(200).json(codes);
    } catch (error) {
        console.error("Fehler beim Abrufen der Codes:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Codes." });
    }
});

// Route für Abstimmung
app.post('/api/vote', async (req, res) => {
    const { code, voteOption } = req.body;

    // Überprüfen, ob code und voteOption vorhanden sind
    if (!code || !voteOption) {
        return res.status(400).json({ message: 'Code und Abstimmungsoption sind erforderlich.' });
    }

    // Überprüfen, ob der Code gültig ist (von der Code-Sammlung)
    const existingCode = await Code.findOne({ code, used: false });

    if (!existingCode) {
        return res.status(400).json({ message: 'Ungültiger oder bereits verwendeter Code.' });
    }

    const vote = new Vote({ code, voteOption });
    await vote.save();

    // Ergebnisse aktualisieren
    await Result.findOneAndUpdate(
        { option: voteOption },
        { $inc: { count: 1 } }, 
        { upsert: true } 
    );

    await Code.updateOne({ code }, { used: true }); 
    res.status(200).json({ message: 'Stimme erfolgreich abgegeben!' });
});

// Route, um die Wahlergebnisse abzurufen
app.get('/api/results', async (req, res) => {
    try {
        // Gruppiere die Votes nach der gewählten Option und zähle die Stimmen
        const results = await Vote.aggregate([
            { $group: { _id: "$voteOption", count: { $sum: 1 } } }
        ]);

        // Sende die Ergebnisse zurück an den Client
        res.status(200).json(results);
    } catch (error) {
        console.error("Fehler beim Abrufen der Ergebnisse:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Ergebnisse." });
    }
});

// Route für die Hauptseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sende die HTML-Datei
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
