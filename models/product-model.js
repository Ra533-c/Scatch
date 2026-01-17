const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
            type:Number,
            default:0
        },
    bgcolor:{
        type:String
    },
    panelcolor:{
        type:String
    },
    textcolor:{
        type:String
    },
});

module.exports = mongoose.model("Product",productSchema);