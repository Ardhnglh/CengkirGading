const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup penyimpanan dengan dynamic destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (req.originalUrl.includes("daily-exercise")) {
      uploadPath = path.join(__dirname, "../uploads/dailyExercise");
    } else if (req.originalUrl.includes("skenario")) {
      uploadPath = path.join(__dirname, "../uploads/skenario");
    } else if (req.originalUrl.includes("kalenderAcara")) {
      uploadPath = path.join(__dirname, "../uploads/kalender_acara");
    } else {
      uploadPath = path.join(__dirname, "../uploads/other");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "video/mp4",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb("Error: File type not supported!");
  },
});

// Gunakan array untuk multiple file upload
const uploadMultiple = upload.array("file", 10);

module.exports = uploadMultiple;
