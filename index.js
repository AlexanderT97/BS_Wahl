const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Verbunden mit MongoDB'))
    .catch(err => console.error('Fehler bei der Verbindung mit MongoDB:', err));


// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Standard-Route zur Rückgabe von index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API-Routen
app.post('/api/vote', async (req, res) => {
    // Hier kommt die Logik für das Voting
});

app.get('/api/results', async (req, res) => {
    // Hier kommt die Logik für das Abrufen der Ergebnisse
});

// Server-Export für Vercel
module.exports = app;
