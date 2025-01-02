if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express =require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const WarpAsync =require("./ultis/warpasync");
const ExpressError =require("./ultis/expresserror.js");
const consultRouter = require("./routes/consult.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(3000,()=>{
    console.log("server is listening to port no: 3000");
});

// setting up mongoose
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/clinic");
}

main()
.then((result)=>{
    console.log("Connected With MongoDB Server");
}).catch((err)=>{
    console.log(err);
})

// setting up session
const sessionInfo={
    secret:"mysupersecret",
    resave:false,  
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionInfo));

// setting up flash
app.use(flash());

// setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

// user (login and signup) page
app.use("/",userRouter);

//consult page
app.use("/consult",consultRouter);

// home page 
app.get("/",WarpAsync((req,res,next)=>{
    res.render("homepage.ejs");
}));

// error handling for page not found
app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page Not found!!"));
})

// error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong !!"} =err;
    res.render("error.ejs",{message});
})
