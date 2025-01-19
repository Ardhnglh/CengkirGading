const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");

const KalenderAcara = db.define(
  "kalender_acara",
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
    tanggal_event: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    file_paths: {
      type: DataTypes.JSON, // Menyimpan array JSON sebagai string
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = KalenderAcara;
