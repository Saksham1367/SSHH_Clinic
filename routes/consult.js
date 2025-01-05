const express =require("express");
const router = express.Router();
const WarpAsync =require("../ultis/warpasync.js");
const Consult = require("../models/consult.js");
const {consultSchema} =require("../ultis/schema.js");
const ExpressError =require("../ultis/expresserror.js");
const {isLoggedIn} = require("../ultis/isLoggedIn.js");


router.get("/",isLoggedIn ,(req, res) => {
    res.render("consult.ejs");
}); 

router.post("/", WarpAsync(async(req, res,next) => {
    try{
    let data= req.body;
    let {error} = consultSchema.validate(data);
    if(error){
        throw new ExpressError(400,error.message);
    }
    const newConsult = new Consult({...data});
    await newConsult.save();
    req.flash("success","Appointment Booked Successfully !!");
    res.redirect("/");
    }catch (err) {
        console.error("Consult creation error:", err.message); // Debugging log
        req.flash("error", "Failed to book appointment. Please try again.");
        next(err);
    }
}));

// notifications 
router.get("/notifications",isLoggedIn,
    WarpAsync(async(req,res,next)=>{
    const consultInfo =await Consult.find({});
    if (!consultInfo.length) {
        req.flash("error", "No notifications at the moment.");
    }
    res.render("notifications.ejs",{consultInfo});
}));

router.delete("/notifications/:id",WarpAsync(async(req,res)=>{
    let {id} =req.params;
    let deleteConsult = await Consult.findByIdAndDelete(id);
    req.flash("success",`Appointment Delails Of ${deleteConsult.username} Has Been Deleted !!`);
    res.redirect("/");
}))


module.exports = router;
