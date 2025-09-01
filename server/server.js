const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes/api");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require('./models/db');
connectDB();
app.use(express.json());
app.use("/api",route);
app.use(cors());
app.get("/",(req,res) => {
    res.send("Server side is running");
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});