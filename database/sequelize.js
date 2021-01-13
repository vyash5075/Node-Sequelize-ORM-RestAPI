const Sequelize = require("sequelize");
module.exports = new Sequelize("info2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
