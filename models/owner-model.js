const  mongoose = require("mongoose");


const ownerSchema = new mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        minLength:3,
        required:true
    },
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String
});

module.exports = mongoose.model("Owner",ownerSchema);