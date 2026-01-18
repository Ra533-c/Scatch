const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

// 1. Form dikhane ke liye GET route
router.get("/create", (req, res) => {
    res.render("owner-login");
});

// 2. Owner create karne ke liye POST route
if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            await ownerModel.deleteMany({}); // Purane owners delete kar do
        }

        let {fullname, email, password} = req.body; // Spelling fix: fullName -> fullname
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.redirect("/owners/admin"); // Admin page par bhejo
    });
}

router.get("/admin", function(req, res){
    let success = req.flash("success");
    res.render("createproducts", { success });
});


module.exports = router;