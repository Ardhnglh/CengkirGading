const express = require("express");
const { login, logout, isTokenBlacklisted } = require("../controllers/Auth.js");

const router = express.Router();

// Route Post
router.post("/login", login);
router.post("/logout", isTokenBlacklisted, logout);

module.exports = router;
