const fs = require("fs");
const path = require("path");
const DailyExercise = require("../models/DailyExerciseModel.js");

// Membuat data DailyExercise
exports.createDailyExercise = async (req, res) => {
  const { judul, deskripsi, tipe } = req.body;
  let filePaths = [];

  if (req.files && req.files.length > 0) {
    filePaths = req.files.map((file) =>
      file.path.replace(/\\/g, "/").replace(/^.*\/uploads/, "/uploads")
    );
  }

  try {
    const dailyExercise = await DailyExercise.create({
      judul,
      deskripsi,
      file_path: filePaths.join(","),
      tipe,
    });

    res.status(201).json(dailyExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDailyExercise = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const dailyExercises = await DailyExercise.findAll();

    const response = dailyExercises.map((exercise) => {
      return {
        ...exercise.dataValues,
        file_path: exercise.file_path
          ? exercise.file_path.split(",").map((path) => `${baseUrl}${path}`)
          : null,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan data DailyExercise berdasarkan ID
exports.getDailyExerciseById = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const dailyExercise = await DailyExercise.findByPk(req.params.id);

    if (!dailyExercise) {
      return res
        .status(404)
        .json({ message: "Daily Exercise tidak ditemukan" });
    }

    const response = {
      ...dailyExercise.dataValues,
      file_path: dailyExercise.file_path
        ? dailyExercise.file_path.split(",").map((path) => `${baseUrl}${path}`)
        : [],
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update data DailyExercise
exports.updateDailyExercise = async (req, res) => {
  const { judul, deskripsi, tipe } = req.body;

  const newFilePaths = req.files
    ? req.files.map((file) =>
        file.path.replace(/\\/g, "/").replace(/^.*\/uploads/, "/uploads")
      )
    : [];

  try {
    const dailyExercise = await DailyExercise.findByPk(req.params.id);
    if (!dailyExercise) {
      return res
        .status(404)
        .json({ message: "Daily Exercise tidak ditemukan" });
    }

    const oldFilePathsArray = dailyExercise.file_path
      ? dailyExercise.file_path.split(",")
      : [];

    if (newFilePaths.length > 0) {
      oldFilePathsArray.forEach((filePath) => {
        const absolutePath = path.join(
          __dirname,
          "../uploads",
          filePath.replace(/^\/uploads\//, "")
        );
        fs.unlink(absolutePath, (err) => {
          if (err) {
            console.error(
              `Gagal menghapus file ${absolutePath}: ${err.message}`
            );
          }
        });
      });
    }

    await dailyExercise.update({
      judul,
      deskripsi,
      file_path:
        newFilePaths.length > 0
          ? newFilePaths.join(",")
          : dailyExercise.file_path,
      tipe,
    });

    res.status(200).json(dailyExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus data DailyExercise
exports.deleteDailyExercise = async (req, res) => {
  try {
    const dailyExercise = await DailyExercise.findByPk(req.params.id);
    if (!dailyExercise) {
      console.log("Exercise tidak ditemukan");
      return res
        .status(404)
        .json({ message: "Daily Exercise tidak ditemukan" });
    }

    let filePathArray = [];

    if (typeof dailyExercise.file_path === "string") {
      try {
        filePathArray = JSON.parse(dailyExercise.file_path);
      } catch (error) {
        filePathArray = [dailyExercise.file_path];
      }
    } else if (Array.isArray(dailyExercise.file_path)) {
      filePathArray = dailyExercise.file_path;
    }

    if (filePathArray.length > 0) {
      filePathArray.forEach((filePath) => {
        const absolutePath = path.join(
          __dirname,
          "../uploads",
          filePath.replace(/^\/uploads\//, "")
        );
        fs.unlink(absolutePath, (err) => {
          if (err) {
            console.error(
              `Gagal menghapus file ${absolutePath}: ${err.message}`
            );
          } else {
            console.log(`File ${absolutePath} berhasil dihapus`);
          }
        });
      });
    }

    await dailyExercise.destroy();
    console.log("Exercise berhasil dihapus dari database");
    res
      .status(200)
      .json({ message: "Daily Exercise dan file berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting exercise:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan total DailyExercise
exports.getTotalDailyExercise = async (req, res) => {
  try {
    const total = await DailyExercise.count();

    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
