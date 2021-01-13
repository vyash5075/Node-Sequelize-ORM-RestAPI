//model
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

module.exports = sequelize.define(
  "artists",
  {
    id: {
      field: "ArtistId",
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is Required",
        },
        isAlpha: {
          args: true,
          msg: "Name must only contain letters",
        },
        len: {
          args: [2, 10],
          msg: "name must be between 2 to 10 characters",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
