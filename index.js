const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS-Konfiguration
app.use(cors({
    origin: '*',  // Erlaubt alle Ursprünge (nur für Entwicklung, in der Produktion am besten spezifische URLs angeben)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Erlaubte HTTP-Methoden
    allowedHeaders: ['Content-Type', 'Authorization']  // Erlaubte Header
}));

app.use(express.json());

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Verbunden mit MongoDB'))
    .catch(err => console.error('Verbindungsfehler mit MongoDB:', err));

// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importiere die API-Routen
const resultsRouter = require('./api/results'); // Importiere die Ergebnisse-Routen
const voteRouter = require('./api/vote'); // Importiere die Abstimmungs-Routen

// Verwende die API-Routen
app.use('/api/results', resultsRouter);
app.use('/api/vote', voteRouter);

// Server-Export für Vercel
module.exports = app;

