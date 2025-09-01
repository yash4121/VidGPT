const mongoose = require("mongoose");

const transcribeDataSchema = new mongoose.Schema({
    transcribeData: {
        type: String,
        required: true
    }
});

const TranscribeData = mongoose.model("TranscribeData", transcribeDataSchema);

module.exports = TranscribeData;