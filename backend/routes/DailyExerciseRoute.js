const express = require("express");
const uploadMultiple = require("../config/Multer.js"); 
const {
  createDailyExercise,
  getDailyExercise,
  getDailyExerciseById,
  getTotalDailyExercise,
  updateDailyExercise,
  deleteDailyExercise,
} = require("../controllers/DailyExerciseController.js");

const router = express.Router();

// Rute Get
router.get("/daily-exercise", getDailyExercise);
router.get("/daily-exercise/:id", getDailyExerciseById);
router.get("/daily-exercise/all/exercise", getTotalDailyExercise);

// Rute Post
router.post("/daily-exercise", uploadMultiple, createDailyExercise);

// Rute Put
router.put("/daily-exercise/:id", uploadMultiple, updateDailyExercise);

// Rute Delete
router.delete("/daily-exercise/:id", deleteDailyExercise);

module.exports = router;
