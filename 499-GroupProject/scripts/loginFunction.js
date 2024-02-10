// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Example user list. In a real application, you would use a database.
const users = [
    // User passwords should be hashed even in databases for security reasons.
    // For this example, passwords are plaintext for simplicity.
    { username: "user1", password: "password1" } // In practice, store hashed passwords
];

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user) {
        // In a real application, use bcrypt to compare hashed passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // Login successful
            res.json({ message: "Login successful" });
        } else {
            // Password does not match
            res.status(401).json({ message: "Invalid credentials" });
        }
    } else {
        // Username not found
        res.status(404).json({ message: "User not found" });
    }
});

module.exports = router;
