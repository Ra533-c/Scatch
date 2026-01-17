const  mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
    cart:{
            type:Array,
            default:[]
        },
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
});

module.exports = mongoose.model("User",userSchema);