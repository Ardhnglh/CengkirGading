const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const User = require("./UsersModel.js");

const EvaluasiKarakter = db.define(
  "evaluasi_karakter",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    judul_evaluasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluasi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kekurangan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tanggal_evaluasi: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Definisikan relasi
User.hasMany(EvaluasiKarakter, { foreignKey: "user_id" });
EvaluasiKarakter.belongsTo(User, { foreignKey: "user_id" });

module.exports = EvaluasiKarakter;
