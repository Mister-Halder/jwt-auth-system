const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentDB";
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;