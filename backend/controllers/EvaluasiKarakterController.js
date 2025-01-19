const EvaluasiKarakter = require("../models/EvaluasiKarakterModel.js");
const User = require("../models/UsersModel.js");

// Membuat data EvaluasiKarakter
exports.createEvaluasiKarakter = async (req, res) => {
  try {
    const { judul_evaluasi, evaluasi, kekurangan, user_id, tanggal_evaluasi } =
      req.body;
    const newEvaluasiKarakter = await EvaluasiKarakter.create({
      judul_evaluasi,
      evaluasi,
      kekurangan,
      user_id,
      tanggal_evaluasi,
    });
    res.status(201).json(newEvaluasiKarakter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan semua data EvaluasiKarakter
exports.getEvaluasiKarakter = async (req, res) => {
  try {
    const evaluasiKarakters = await EvaluasiKarakter.findAll({
      include: [User], //
    });
    res.status(200).json(evaluasiKarakters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan data Evaluasi Karakter berdasarkan ID
exports.getEvaluasiKarakterById = async (req, res) => {
  try {
    const evaluasiKarakter = await EvaluasiKarakter.findOne({
      where: { id: req.params.id },
      include: [User],
    });
    if (!evaluasiKarakter)
      return res
        .status(404)
        .json({ message: "Evaluasi Karakter tidak ditemukan" });
    res.status(200).json(evaluasiKarakter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan data Evaluasi Karakter berdasarkan UserID
exports.getEvaluasiKarakterByUserId = async (req, res) => {
  try {
    const evaluasiKarakter = await EvaluasiKarakter.findAll({
      where: { user_id: req.params.user_id },
      include: [User],
    });

    if (evaluasiKarakter.length === 0) {
      return res.status(200).json({ message: "Belum Ada Evaluasi" });
    }

    res.status(200).json(evaluasiKarakter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan riwayat evaluasi berdasarkan UserID
exports.getRiwayatEvaluasiByUserId = async (req, res) => {
  try {
    const riwayatEvaluasi = await EvaluasiKarakter.findAll({
      where: { user_id: req.params.user_id },
      include: [User],
      order: [["tanggal_evaluasi", "DESC"]],
    });

    if (riwayatEvaluasi.length === 0) {
      return res.status(200).json({ message: "Belum Ada Riwayat Evaluasi" });
    }

    res.status(200).json(riwayatEvaluasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update data EvaluasiKarakter
exports.updateEvaluasiKarakter = async (req, res) => {
  try {
    const { judul_evaluasi, evaluasi, kekurangan, user_id, tanggal_evaluasi } =
      req.body;
    const evaluasiKarakter = await EvaluasiKarakter.findOne({
      where: { id: req.params.id },
    });
    if (!evaluasiKarakter)
      return res
        .status(404)
        .json({ message: "Evaluasi Karakter tidak ditemukan" });

    evaluasiKarakter.judul_evaluasi = judul_evaluasi;
    evaluasiKarakter.evaluasi = evaluasi;
    evaluasiKarakter.kekurangan = kekurangan;
    evaluasiKarakter.user_id = user_id;
    evaluasiKarakter.tanggal_evaluasi = tanggal_evaluasi;
    await evaluasiKarakter.save();

    res.status(200).json(evaluasiKarakter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus data EvaluasiKarakter
exports.deleteEvaluasiKarakter = async (req, res) => {
  try {
    const evaluasiKarakter = await EvaluasiKarakter.findOne({
      where: { id: req.params.id },
    });
    if (!evaluasiKarakter)
      return res
        .status(404)
        .json({ message: "Evaluasi Karakter tidak ditemukan" });

    await evaluasiKarakter.destroy();
    res.status(200).json({ message: "Evaluasi Karakter berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
