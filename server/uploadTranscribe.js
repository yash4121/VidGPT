const connectDB = require("./models/db");
const fs = require("fs");
const TranscribeData = require("./models/TranscribeData");
connectDB();
var data = fs.readFileSync("../transcribe/transcribe.txt", {
    encoding: "utf8",
});

