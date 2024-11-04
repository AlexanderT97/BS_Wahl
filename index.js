const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Für Entwicklung: Erlaube alle Ursprünge. In der Produktion spezifische URLs verwenden.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Erlaubte HTTP-Methoden
    allowedHeaders: ['Content-Type', 'Authorization'] // Erlaubte Header
}));
app.use(express.json()); // Erlaubt das Parsen von JSON-Anfragen
app.use(express.static(path.join(__dirname, 'public'))); // Stelle statische Dateien aus dem "public"-Ordner bereit

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Diese Optionen sind deprecated, aber hier zur Demonstration
    useUnifiedTopology: true
})
.then(() => console.log('Verbunden mit MongoDB'))
.catch(err => console.error('Verbindungsfehler mit MongoDB:', err));

// API-Routen importieren
const voteRouter = require('./api/vote');
const resultsRouter = require('./api/results');

// API-Routen verwenden
app.use('/api/vote', voteRouter);      // Diese Zeile verknüpft die Voting-Route
app.use('/api/results', resultsRouter);  // Diese Zeile verknüpft die Resultate-Route

// Statische Dateien bereitstellen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server-Export für Vercel
module.exports = app;

