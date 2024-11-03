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

// Importiere die API-Routen
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

// Route für die Hauptseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sende die HTML-Datei
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
