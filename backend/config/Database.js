const Sequelize = require("sequelize");

const db = new Sequelize(
  "tiljnvqz_db_cengkir-gading",
  "tiljnvqz_admin",
  "HOM5dX&@AG{H",
  {
    host: "api1.cengkirgading.my.id",
    dialect: "mysql",
  }
);

const database = db;

module.exports = database;