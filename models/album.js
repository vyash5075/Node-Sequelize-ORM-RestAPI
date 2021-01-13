//model
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "albums",
  {
    id: {
      field: "AlbumId",
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      field: "title",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
