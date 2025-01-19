const Drama = require("../models/DramaModel.js");

// Membuat data drama
exports.createDrama = async (req, res) => {
  const { nama, deskripsi } = req.body;
  try {
    const drama = await Drama.create({
      nama,
      deskripsi,
    });
    res.status(201).json(drama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua data drama
exports.getDrama = async (req, res) => {
  try {
    const dramas = await Drama.findAll();
    res.status(200).json(dramas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan data drama berdasarkan ID
exports.getDramaById = async (req, res) => {
  try {
    const drama = await Drama.findByPk(req.params.id);
    if (!drama) return res.status(404).json({ message: "Drama tidak ditemukan" });
    res.status(200).json(drama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update data Drama
exports.updateDrama = async (req, res) => {
  const { nama, deskripsi } = req.body;
  try {
    const drama = await Drama.findByPk(req.params.id);
    if (!drama) return res.status(404).json({ message: "Drama tidak ditemukan" });

    await drama.update({
      nama,
      deskripsi,
    });
    res.status(200).json(drama);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus data Drama
exports.deleteDrama = async (req, res) => {
  try {
    const drama = await Drama.findByPk(req.params.id);
    if (!drama) return res.status(404).json({ message: "Drama tidak ditemukan" });

    await drama.destroy();
    res.status(200).json({ message: "Drama berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
