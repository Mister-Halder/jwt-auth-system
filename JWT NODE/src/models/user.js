const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: {type: String, enum: ["admin", "customer"], default: "customer"}
});

module.exports = mongoose.model("User", userSchema);