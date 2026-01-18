require("dotenv").config();
console.log("JWT_KEY CHECK:", process.env.JWT_KEY);
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/db.js");
const expressSession = require("express-session");
const flash = require("connect-flash");


const indexRouter = require("./routes/indexRouter.js");
const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");


const app = express();

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// app.use("*" ,(req,res)=>{
//     res.send("Page Not Found!❌")
// });

app.listen(3000);