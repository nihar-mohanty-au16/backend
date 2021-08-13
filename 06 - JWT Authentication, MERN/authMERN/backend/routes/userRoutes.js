const express = require("express");

// const { errorHandler } = require("./middlewares/errorMiddleware");
const { register } = require("../controllers/userControllers");
const { authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(register);
router.route("/login").post(authUser);

module.exports = router;
