const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

console.log("process.env.NODE_ENV --->", process.env.NODE_ENV);  //we set it using ($env:NODE_ENV="development") in terminal


if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create a new owner !")
        }

        let {fullname ,email , password} = req.body;
        if(!fullname || !email || !password){
            return res.status(503).send("fill all nesseccery fields!")
        }
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner)
    });
}

router.get("/", (req, res) => {
    res.send("Hello")
});



module.exports = router;