const crypto = require("crypto");

// Use a static fallback so tokens persist across server restarts
const secretKey = process.env.JWT_SECRET || "default_development_secret_key_12345";

module.exports = {
    secretKey
};
