const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { username, password } = req.body;

    // Temporary demo user
    const demoUser = {
        id: 1,
        username: "admin",
        passwordHash: await bcrypt.hash("Admin123!", 10)
    };

    if (username !== demoUser.username) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, demoUser.passwordHash);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            id: demoUser.id,
            username: demoUser.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token
    });
};

module.exports = { login };