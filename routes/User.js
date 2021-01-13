const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { fetchallusers } = require("../Controllers/user");
router.get("/", fetchallusers);
module.exports = router;
