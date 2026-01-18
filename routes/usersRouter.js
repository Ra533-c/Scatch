const express = require("express");
const router = express.Router();
const Joi = require("joi");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser } = require("../controllers/authController.js");
const { loginUser } = require("../controllers/authController.js");
const {logoutUser} = require("../controllers/authController.js")

router.get("/", (req, res) => {
    res.send("Hey it's  working...")
});

router.post("/register", registerUser);

router.post("/login", loginUser)

router.get("/logout" ,logoutUser);

module.exports = router;