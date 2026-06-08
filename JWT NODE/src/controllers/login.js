const authService = require("../services/login");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token: token });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const resetToken = await authService.forgotPassword(email);
        res.json({ token: resetToken, message: "Reset token generated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function resetPassword(req, res) {
    try {
        const { token, newPassword } = req.body;
        await authService.resetPassword(token, newPassword);
        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    login,
    forgotPassword,
    resetPassword
};
