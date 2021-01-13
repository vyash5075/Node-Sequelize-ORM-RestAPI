const express = require("express");
const router = express.Router();
const User = require("../models/user");

const fetchallusers = function (req, res) {
  User.findAll()
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((err) => console.log(err));
};

module.exports = { fetchallusers };
