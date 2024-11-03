const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    used: { type: Boolean, default: false }
});

module.exports = mongoose.model('Code', codeSchema);
