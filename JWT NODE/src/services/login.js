const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

async function forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const jwt = require("jsonwebtoken");
    const { secretKey } = require("../configuration/jwtConfig");
    const resetToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: "15m" });
    return resetToken;
}

async function resetPassword(token, newPassword) {
    const jwt = require("jsonwebtoken");
    const { secretKey } = require("../configuration/jwtConfig");
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error("User not found");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return true;
    } catch (err) {
        throw new Error("Invalid or expired reset token");
    }
}

module.exports = {
    login,
    forgotPassword,
    resetPassword
};
