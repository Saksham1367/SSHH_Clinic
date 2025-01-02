const express =require("express");
const router = express.Router();
const WarpAsync =require("../ultis/warpasync.js");
const Consult = require("../models/consult.js");
const consultSchema =require("../ultis/schema.js");
const ExpressError =require("../ultis/expresserror.js");
const {isLoggedIn} = require("../ultis/isLoggedIn.js");


router.get("/",isLoggedIn ,(req, res) => {
    res.render("consult.ejs");
}); 

router.post("/", WarpAsync(async(req, res,next) => {
    let data= req.body;
    let {error} = consultSchema.validate(data);
    if(error){
        throw new ExpressError(400,"Invalid Data");
    }
    console.log(result);
    const newConsult = new Consult({...data});
    await newConsult.save();
    req.flash("success","Consultation Created Successfully");
    res.redirect("/");
}));

module.exports = router;
