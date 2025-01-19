const User = require("../models/UsersModel.js");
const argon2 = require("argon2");

// Buat user
exports.createUser = async (req, res) => {
  const { nama, email, kataSandi, nim, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email sudah terdaftar. Silakan gunakan email lain." });
    }

    const hashedPassword = await argon2.hash(kataSandi);

    const user = await User.create({
      nama,
      email,
      kataSandi: hashedPassword,
      nim,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan pada server. Silakan coba lagi." });
  }
};

// Mendapatkan semua data user
exports.getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan data user berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { nama, email, kataSandi, nim, role } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const hashedPassword = kataSandi
      ? await argon2.hash(kataSandi)
      : user.kataSandi;

    await user.update({
      nama,
      email,
      kataSandi: hashedPassword,
      nim,
      role,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await user.destroy();
    res.status(200).json({ message: "Berhasil menghapus user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghitung total user
exports.countUsers = async (req, res) => {
  try {
    const totalUsers = await User.count({
      where: { role: "user" },
    });
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
