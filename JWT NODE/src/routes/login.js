const express = require("express");
const cors = require("cors");
const loginController = require("../controllers/login");

const router = express.Router();

router.post("/login", cors(), loginController.login);
router.post("/forgot-password", cors(), loginController.forgotPassword);
router.post("/reset-password", cors(), loginController.resetPassword);

module.exports = router;
