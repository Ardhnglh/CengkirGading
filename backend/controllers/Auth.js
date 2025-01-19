const User = require("../models/UsersModel.js");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

let blacklistedTokens = [];

// Fungsi login
exports.login = async (req, res) => {
  const { email, kataSandi } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const match = await argon2.verify(user.kataSandi, kataSandi);
    if (!match) {
      return res.status(400).json({ message: "Kata sandi salah" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      role: user.role,
      nama: user.nama,
      nim: user.nim,
      userId: user.id,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      res.status(500).json({
        message: "Server tidak aktif. Pastikan XAMPP atau database berjalan.",
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Fungsi logout
exports.logout = (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  blacklistedTokens.push(token);
  res
    .status(200)
    .json({ message: "Logout berhasil, token telah di-blacklist" });
};

// Middleware untuk memeriksa token yang di-blacklist
exports.isTokenBlacklisted = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (blacklistedTokens.includes(token)) {
    return res
      .status(401)
      .json({ message: "Token telah di-blacklist. Harap login kembali." });
  }

  next();
};
