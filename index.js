const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Verbunden mit MongoDB'))
    .catch(err => console.error('Verbindungsfehler mit MongoDB:', err));

// API-Routen importieren
const voteRouter = require('./api/vote');
const resultsRouter = require('./api/results');

// API-Routen verwenden
app.use('/api/vote', voteRouter);
app.use('/api/results', resultsRouter);

// Statische Dateien bereitstellen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server-Export für Vercel
module.exports = app;
