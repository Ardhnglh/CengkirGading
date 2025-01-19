const fs = require("fs").promises;
const path = require("path");
const { Op } = require("sequelize");
const KalenderAcara = require("../models/KalenderAcaraModel.js");

// Membuat data KalenderAcara
exports.createKalenderAcara = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal_event } = req.body;

    let file_paths = [];
    if (req.files && req.files.length > 0) {
      file_paths = req.files.map((file) =>
        file.path.replace(/\\/g, "/").replace(/^.*\/uploads/, "/uploads")
      );
    }

    const file_paths_string = file_paths.join(",");

    const newKalenderAcara = await KalenderAcara.create({
      judul,
      deskripsi,
      tanggal_event,
      file_paths: file_paths_string,
    });

    res.status(201).json(newKalenderAcara);
  } catch (error) {
    console.error("Error creating KalenderAcara:", error);
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan semua data KalenderAcara
exports.getKalenderAcara = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const kalenderAcaras = await KalenderAcara.findAll();

    const response = kalenderAcaras.map((event) => {
      const file_paths_array = event.file_paths
        ? event.file_paths.split(",")
        : [];
      return {
        ...event.dataValues,
        file_paths: file_paths_array.map((filePath) => {
          return `${baseUrl}${filePath.replace(/"/g, "")}`;
        }),
      };
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan data KalenderAcara berdasarkan ID
exports.getKalenderAcaraById = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const kalenderAcara = await KalenderAcara.findOne({
      where: { id: req.params.id },
    });

    if (!kalenderAcara)
      return res
        .status(404)
        .json({ message: "Kalender Acara tidak ditemukan" });

    console.log("Kalender Acara:", kalenderAcara);

    let file_paths_array;
    if (Array.isArray(kalenderAcara.file_paths)) {
      file_paths_array = kalenderAcara.file_paths.map((filePath) => {
        return `${baseUrl}${filePath.replace(/"/g, "").replace(/\\/g, "/")}`;
      });
    } else if (typeof kalenderAcara.file_paths === "string") {
      file_paths_array = kalenderAcara.file_paths.split(",").map((filePath) => {
        return `${baseUrl}${filePath.replace(/"/g, "").replace(/\\/g, "/")}`;
      });
    } else {
      file_paths_array = [];
    }

    console.log("File Paths Array:", file_paths_array);

    res.status(200).json({
      ...kalenderAcara.dataValues,
      file_paths: file_paths_array,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update data KalenderAcara
exports.updateKalenderAcara = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal_event } = req.body;

    const kalenderAcara = await KalenderAcara.findOne({
      where: { id: req.params.id },
    });

    if (!kalenderAcara) {
      return res
        .status(404)
        .json({ message: "Kalender Acara tidak ditemukan" });
    }

    const oldFilePaths = kalenderAcara.file_paths
      ? kalenderAcara.file_paths.split(",")
      : [];

    let file_paths = [];

    if (req.files && req.files.length > 0) {
      file_paths = req.files.map((file) =>
        file.path.replace(/\\/g, "/").replace(/^.*\/uploads/, "/uploads")
      );

      for (const filePath of oldFilePaths) {
        const cleanedFilePath = filePath.replace(/["\\]/g, "");

        const absolutePath = path.resolve(
          __dirname,
          "..",
          "uploads",
          cleanedFilePath.replace(/^\/uploads\//, "")
        );
        console.log("Deleting file:", absolutePath);

        try {
          await fs.access(absolutePath, fs.constants.F_OK);

          await fs.unlink(absolutePath);
          console.log(`File ${absolutePath} berhasil dihapus`);
        } catch (err) {
          if (err.code === "ENOENT") {
            console.error(`File ${absolutePath} tidak ditemukan`);
          } else {
            console.error(
              `Gagal menghapus file ${absolutePath}: ${err.message}`
            );
          }
        }
      }
    } else {
      file_paths = oldFilePaths;
    }

    kalenderAcara.judul = judul;
    kalenderAcara.deskripsi = deskripsi;
    kalenderAcara.tanggal_event = tanggal_event;
    kalenderAcara.file_paths = file_paths.join(",");
    await kalenderAcara.save();

    res.status(200).json(kalenderAcara);
  } catch (error) {
    console.error("Error updating Kalender Acara:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete KalenderAcara
exports.deleteKalenderAcara = async (req, res) => {
  try {
    const kalenderAcara = await KalenderAcara.findOne({
      where: { id: req.params.id },
    });

    if (!kalenderAcara)
      return res
        .status(404)
        .json({ message: "Kalender Acara tidak ditemukan" });

    if (kalenderAcara.file_paths && kalenderAcara.file_paths.length > 0) {
      const file_paths_array = kalenderAcara.file_paths.split(",");

      for (const filePath of file_paths_array) {
        const cleanedFilePath = filePath.replace(/"/g, "").replace(/\\/g, "/");

        const absolutePath = path.resolve(
          __dirname,
          "..",
          cleanedFilePath.replace(/^\/uploads\//, "uploads/")
        );

        console.log(`Cek path file: ${absolutePath}`);

        try {
          await fs.access(absolutePath);
          await fs.unlink(absolutePath);
          console.log(`File ${absolutePath} berhasil dihapus`);
        } catch (err) {
          if (err.code === "ENOENT") {
            console.error(`File ${absolutePath} tidak ditemukan`);
          } else {
            console.error(
              `Gagal menghapus file ${absolutePath}: ${err.message}`
            );
          }
        }
      }
    }

    await kalenderAcara.destroy();
    res.status(200).json({ message: "Kalender Acara berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghitung Perbulan KalenderAcara
exports.getKalenderAcaraByMonth = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const today = new Date();
    const tahun = parseInt(req.query.tahun, 10) || today.getFullYear();

    const kalenderAcaras = await KalenderAcara.findAll({
      where: {
        tanggal_event: {
          [Op.between]: [new Date(tahun, 0, 1), new Date(tahun, 11, 31)],
        },
      },
    });

    const groupedEvents = kalenderAcaras.reduce((acc, event) => {
      const date = new Date(event.tanggal_event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      const file_paths_array = event.file_paths
        ? event.file_paths.split(",")
        : [];
      acc[year][month].push({
        ...event.dataValues,
        file_paths: file_paths_array.map(
          (filePath) => `${baseUrl}${filePath.replace(/"/g, "")}`
        ),
      });

      return acc;
    }, {});

    res.status(200).json(groupedEvents);
  } catch (error) {
    console.error("Error getting Kalender Acara:", error);
    res.status(500).json({ message: error.message });
  }
};

//Menghitung Acara Bulan ini
exports.getKalenderAcaraThisMonth = async (req, res) => {
  try {
    const today = new Date();
    const bulanIni = today.getMonth();
    const tahunIni = today.getFullYear();

    const kalenderAcaras = await KalenderAcara.findAll({
      where: {
        tanggal_event: {
          [Op.between]: [
            new Date(tahunIni, bulanIni, 1),
            new Date(tahunIni, bulanIni + 1, 0),
          ],
        },
      },
    });

    const totalKalenderAcaraBulanIni = kalenderAcaras.length;

    res.status(200).json({
      year: tahunIni,
      month: bulanIni + 1,
      totalKalenderAcara: totalKalenderAcaraBulanIni,
    });
  } catch (error) {
    console.error("Error getting Kalender Acara this month:", error);
    res.status(500).json({ message: error.message });
  }
};
