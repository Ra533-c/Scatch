const Joi = require("joi");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const Schema = Joi.object({
            fullname: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(3).max(20).required()
        })

        let { error } = Schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        let { fullname, email, password } = req.body;

        bcrypt.genSalt(12, (err, salt) => {
            if (err) return res.status(500).send("error in generation salt ❌");
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send("error in hashing password ❌");
                let user = await userModel.create({
                    fullname,
                    password: hash,
                    email
                })
                let token = generateToken(user);
                res.cookie("token", token);
                console.log(`user created successfully ✅ : ${user}`)
                res.status(201).send(`user created successfully ✅ : ${user}`);
            });
        });
    } catch (err) {
        console.log("Error occured on /register route ❌ :", err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (!user) return res.status(401).send("Email or Password incorrect");

        let result = await bcrypt.compare(password, user.password);
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.status(200).send("You can login");
        } else {
            res.status(401).send("Email or Password incorrect");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}