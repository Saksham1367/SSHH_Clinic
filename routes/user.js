const express =require("express");
const router = express.Router();
const WarpAsync =require("../ultis/warpasync.js");
const User = require("../models/users.js");
const passport = require("passport");
const { originalUrl } = require("../ultis/isLoggedIn.js");


// login page 
router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post("/login",originalUrl,
    passport.authenticate('local', { failureRedirect: "/login",failureFlash:true }), 
    WarpAsync(async(req, res) => {
    req.flash("success","Welcome Back, We Missed You");
    let pathName= res.locals.path || "/";
    console.log("redirecting to :",pathName);
    res.redirect(pathName);
}));

// logout page
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Goodbye,We will Be Right Here To Help You");
        res.redirect("/");
    });
});
// signup page
router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

router.post("/signup", WarpAsync(async(req, res,next) => {
    try{
        let {username,number,email,password}=req.body;
        const newUser =new User({username,email,number});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                req.flash("error", "Login failed after registration. Please try logging in manually.");
                return next(err);
            }
            req.flash("success","Welcome to Clinic");
            res.redirect("/");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}));

module.exports = router;