//model
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "tracks",
  {
    id: {
      field: "TrackId",
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
