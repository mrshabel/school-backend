const express = require("express");
const router = express.Router();
const { restrictsTo } = require("../middleware/auth");
const { getUser } = require("../controllers/user");

router.route("/me").get(restrictsTo, getUser);

module.exports = router;
