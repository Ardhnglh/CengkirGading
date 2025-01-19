const UserRating = require("../models/UserRatingModel.js");
const User = require("../models/UsersModel.js");
const Drama = require("../models/DramaModel.js");
const { Op } = require("sequelize");

// Membuat data UserRating
exports.createUserRating = async (req, res) => {
  const { user_id, ratings } = req.body;

  try {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return res.status(400).json({
        error: "Ratings harus berupa array dan tidak boleh kosong.",
      });
    }

    const userRatings = await Promise.all(
      ratings.map(async (ratingData) => {
        const { parameter_id, rating, tanggal_rating } = ratingData;
        if (!parameter_id || !rating || !tanggal_rating) {
          throw new Error("Data rating tidak lengkap.");
        }

        return await UserRating.create({
          rating,
          user_id,
          parameter_id,
          tanggal_rating: new Date(tanggal_rating),
        });
      })
    );

    res.status(201).json({
      message: "Rating berhasil dibuat untuk beberapa parameter.",
      data: userRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua data UserRating
exports.getUserRating = async (req, res) => {
  try {
    const { parameter_ids, tanggal_rating } = req.query;

    const whereCondition = {
      ...(parameter_ids && { parameter_id: parameter_ids.split(",") }),
      ...(tanggal_rating && { tanggal_rating: tanggal_rating }),
    };

    const userRatings = await UserRating.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ["nama", "email", "nim"] },
        { model: Drama, attributes: ["nama"] },
      ],
    });

    if (userRatings.length === 0) {
      return res.status(404).json({
        message: "Tidak ada rating ditemukan.",
      });
    }

    res.status(200).json({
      message: "Rating berhasil diambil.",
      data: userRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua riwayat rating untuk user tertentu beserta drama terkait
exports.getAllUserRatings = async (req, res) => {
  const { user_id } = req.params;

  // Validasi jika user_id tidak disertakan
  if (!user_id) {
    return res.status(400).json({
      message: "User ID harus disertakan dalam parameter.",
    });
  }

  try {
    // Mencari semua rating untuk user berdasarkan user_id
    const userRatings = await UserRating.findAll({
      where: { user_id },
      include: [
        {
          model: User,
          attributes: ["nama", "email", "nim"], // Menampilkan informasi user
        },
        {
          model: Drama,
          attributes: ["nama"], // Menampilkan nama drama terkait
        },
      ],
    });

    // Jika tidak ada rating ditemukan untuk user_id tersebut
    if (userRatings.length === 0) {
      return res.status(404).json({
        message: "Tidak ada rating ditemukan untuk user ID yang diberikan.",
      });
    }

    // Mengirimkan data rating yang ditemukan
    res.status(200).json({
      message: "Riwayat rating berhasil diambil.",
      data: userRatings,
    });
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam pengambilan data
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil riwayat rating.",
      error: error.message,
    });
  }
};

const isValidDate = (dateString) => {
  // Pastikan format tanggal adalah YYYY-MM-DD menggunakan regex
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

exports.getUserRatingByid = async (req, res) => {
  const { user_id, tanggal_rating } = req.query;

  console.log("Query parameters diterima:", { user_id, tanggal_rating });

  if (!user_id || !tanggal_rating) {
    return res.status(400).json({
      error: "user_id dan tanggal_rating harus disertakan dalam query.",
    });
  }

  if (!isValidDate(tanggal_rating)) {
    return res.status(400).json({
      error: "Format tanggal_rating tidak valid. Gunakan format YYYY-MM-DD.",
    });
  }

  const tanggalMulai = new Date(`${tanggal_rating}T00:00:00Z`);
  const tanggalAkhir = new Date(`${tanggal_rating}T23:59:59Z`);

  try {
    const ratings = await UserRating.findAll({
      where: {
        user_id,
        tanggal_rating: {
          [Op.gte]: tanggalMulai,
          [Op.lte]: tanggalAkhir,
        },
      },
      include: [
        { model: Drama, attributes: ["nama"] },
        { model: User, attributes: ["nama"] },
      ],
    });

    if (ratings.length > 0) {
      res.status(200).json({
        message: "Berhasil mengambil rating pengguna.",
        data: ratings,
      });
    } else {
      res.status(404).json({ message: "Tidak ada rating ditemukan." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan user rating berdasarkan id dari user
exports.getUserRatingByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal_rating } = req.query;

    if (!id) {
      return res.status(400).json({ message: "User ID harus disediakan." });
    }

    const whereCondition = {
      user_id: id,
      ...(tanggal_rating && { tanggal_rating: tanggal_rating }),
    };

    const userRatings = await UserRating.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ["nama", "email", "nim"] },
        { model: Drama, attributes: ["nama"] },
      ],
    });

    if (userRatings.length === 0) {
      return res.status(404).json({
        message: "Rating tidak ditemukan untuk user ID yang diberikan.",
      });
    }

    res.status(200).json({
      message: "Rating berhasil diambil.",
      data: userRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan data UserRating berdasarkan user_id
exports.getUserRatingByUserId = async (req, res) => {
  try {
    const { tanggal_rating } = req.query;

    const whereCondition = {
      user_id: req.params.user_id,
      ...(tanggal_rating && { tanggal_rating: tanggal_rating }),
    };

    const userRatings = await UserRating.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ["nama", "email", "nim"] },
        { model: Drama, attributes: ["nama"] },
      ],
    });

    if (userRatings.length === 0) {
      return res.status(200).json({ message: "Belum Ada Rating" });
    }

    res.status(200).json(userRatings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update data UserRating
exports.updateUserRating = async (req, res) => {
  const { user_id, ratings } = req.body;

  try {
    // Validasi input
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return res.status(400).json({
        error: "Ratings harus berupa array dan tidak boleh kosong.",
      });
    }

    // Proses pembaruan data
    const updatedRatings = await Promise.all(
      ratings.map(async (ratingData) => {
        const { parameter_id, rating, tanggal_rating } = ratingData;

        if (!parameter_id || !tanggal_rating) {
          throw new Error("Data rating tidak lengkap.");
        }

        const userRating = await UserRating.findOne({
          where: { user_id, parameter_id },
        });

        if (userRating) {
          return await userRating.update({
            rating: rating || userRating.rating, // gunakan rating lama jika kosong
            tanggal_rating: new Date(tanggal_rating),
          });
        }

        return null;
      })
    );

    // Filter hasil pembaruan yang berhasil
    const validRatings = updatedRatings.filter((rating) => rating !== null);

    if (validRatings.length === 0) {
      return res.status(404).json({
        message: "Tidak ada User Rating yang ditemukan untuk diperbarui.",
      });
    }

    return res.status(200).json({
      message: "User Rating berhasil diperbarui untuk beberapa parameter.",
      data: validRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus semua rating untuk user_id pada tanggal tertentu beserta parameter terkait
exports.deleteUserRatingsByDate = async (req, res) => {
  const { user_id, tanggal_rating } = req.body;

  // Validasi input
  if (!user_id || !tanggal_rating) {
    return res.status(400).json({
      message:
        "user_id dan tanggal_rating harus disertakan dalam body request.",
    });
  }

  try {
    // Mengonversi tanggal untuk membuat rentang waktu dari awal hingga akhir hari
    const tanggalMulai = new Date(tanggal_rating).setHours(0, 0, 0, 0);
    const tanggalAkhir = new Date(tanggal_rating).setHours(23, 59, 59, 999);

    // Menyusun kondisi pencarian berdasarkan user_id dan tanggal_rating
    const whereCondition = {
      user_id: user_id,
      tanggal_rating: {
        [Op.gte]: tanggalMulai, // Lebih besar atau sama dengan tanggalMulai
        [Op.lte]: tanggalAkhir, // Lebih kecil atau sama dengan tanggalAkhir
      },
    };

    // Menghapus rating berdasarkan kondisi yang ditentukan
    const result = await UserRating.destroy({
      where: whereCondition,
    });

    // Mengirimkan respons berdasarkan hasil penghapusan
    if (result > 0) {
      return res.status(200).json({
        message: `Semua rating untuk user_id ${user_id} pada tanggal ${tanggal_rating} berhasil dihapus.`,
      });
    } else {
      return res.status(404).json({
        message: `Tidak ada rating ditemukan untuk user_id ${user_id} pada tanggal ${tanggal_rating}.`,
      });
    }
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam proses penghapusan
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus rating.", error });
  }
};
