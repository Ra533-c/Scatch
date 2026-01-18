const express = require("express");
const router = express.Router();
const Joi = require("joi");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const Schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            discount: Joi.number().required(),
            bgcolor: Joi.string().allow(""),
            panelcolor: Joi.string().allow(""),
            textcolor: Joi.string().allow(""),
        });
        
        let {error} = Schema.validate(req.body);
        
        if(error) return res.status(400).send(error.details[0].message);
        if(!req.file) return res.status(400).send("Image is required");
        
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
        req.flash("success","product created successfully ✅");
        res.redirect("/owners/admin");

    } catch (err) {
        res.send(err.message);
    }
});


module.exports = router;