const express = require("express");
const router = express.Router();
const Joi = require("joi");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser } = require("../controllers/authController.js");
const { loginUser } = require("../controllers/authController.js");


router.get("/", (req, res) => {
    res.send("Hello")
});

router.post("/register", registerUser);

router.post("/login", loginUser)


module.exports = router;