const express = require("express");
const uploadMultiple = require("../config/Multer.js");
const {
  createKalenderAcara,
  getKalenderAcara,
  getKalenderAcaraById,
  getKalenderAcaraByMonth,
  getKalenderAcaraThisMonth,
  updateKalenderAcara,
  deleteKalenderAcara,
} = require("../controllers/KalenderAcaraController.js");

const router = express.Router();

// Rute Get
router.get("/kalenderAcara", getKalenderAcara);
router.get("/kalenderAcara/:id", getKalenderAcaraById);
router.get("/kalenderAcara/per-month/total", getKalenderAcaraByMonth);
router.get("/kalenderAcara/mounth/this-month/total", getKalenderAcaraThisMonth);

// Rute Post
router.post("/kalenderAcara", uploadMultiple, createKalenderAcara);

// Rute Put
router.put("/kalenderAcara/:id", uploadMultiple, updateKalenderAcara);

// Rute Delete
router.delete("/kalenderAcara/:id", deleteKalenderAcara);

module.exports = router;
