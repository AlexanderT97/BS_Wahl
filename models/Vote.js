const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    code: { type: String, required: true },
    voteOption: { type: String, required: true }
});

module.exports = mongoose.model('Vote', voteSchema);
