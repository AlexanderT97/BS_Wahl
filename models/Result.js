const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    option: { type: String, required: true },
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Result', resultSchema);
