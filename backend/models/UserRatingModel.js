const { DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const User = require("./UsersModel.js");
const Drama = require("./DramaModel.js");

const UserRating = db.define(
  "user_rating",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },
    tanggal_rating: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    parameter_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Drama,
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

//relasi
User.hasMany(UserRating, { foreignKey: "user_id" });
Drama.hasMany(UserRating, { foreignKey: "parameter_id" });
UserRating.belongsTo(User, { foreignKey: "user_id" });
UserRating.belongsTo(Drama, { foreignKey: "parameter_id" });

module.exports = UserRating;
