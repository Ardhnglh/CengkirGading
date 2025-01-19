const express = require("express");
const {
  createDrama,
  getDrama,
  getDramaById,
  updateDrama,
  deleteDrama,
} = require("../controllers/DramaController.js");

const router = express.Router();

//Rute Get
router.get("/drama", getDrama);
router.get("/drama/:id", getDramaById);

//Rute Post
router.post("/drama", createDrama);

//Rute Put
router.put("/drama/:id", updateDrama);

//Rute Delete
router.delete("/drama/:id", deleteDrama);

module.exports = router;
