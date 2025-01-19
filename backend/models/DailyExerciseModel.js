const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const DailyExercise = db.define(
  "daily_exercise",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipe: {
      type: DataTypes.ENUM("Artikel", "Buku","Teori-teori Akting", "Video Tutorial", "Gambar"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = DailyExercise;
