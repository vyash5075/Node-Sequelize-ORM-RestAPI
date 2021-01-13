//model
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      field: "name",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
