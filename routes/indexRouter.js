const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { logoutUser } = require("../controllers/authController")
const router = express.Router();

const userModel = require("../models/user-model");
const productModel = require("../models/product-model");


router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
})

router.get("/shop", isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");
    let bill = 0;
    if(user.cart.length > 0 ){
        user.cart.forEach((product)=>{
            bill = bill + Number(product.price) - Number(product.discount);
        })
        bill+=20;
    }
    res.render("cart", { user, bill });
})

router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });

    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "product added to cart ✅");
    res.redirect("/shop")
})

router.get("/cart/remove/:productId", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });

    let index = user.cart.findIndex((product) => product.toString() === req.params.productId);
    if(index !== -1) user.cart.splice(index,1);
    await user.save();
    req.flash("success", "product removed from cart ✅");
    res.redirect("/cart");
})

router.get("/checkout" , isLoggedIn , async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});

    user.orders.push(...user.cart);
    user.cart = [];
    await user.save();
    res.send("Order Placed Successfully 🚚");
})

router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;