const express = require("express");
const { authenticateToken } = require("../utils/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.get("/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/user", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
