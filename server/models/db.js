const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async (flag) => {
    if(flag) {
        await mongoose
                .connect(process.env.MONGO_URI)
                .then(() => {
                    console.log("Database Connected Successfully !!");
                  })
                .catch((err) => {
                console.log("!! ERROR !!");
                console.log(err);
                });
    } else {
        mongoose.connection.close();
    }
    
};

module.exports = connectDB;

