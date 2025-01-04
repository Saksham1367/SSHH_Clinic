const express =require("express");
const router = express.Router();
const WarpAsync =require("../ultis/warpasync.js");
const ExpressError =require("../ultis/expresserror.js");
const Feedback = require("../models/feedback.js");
const {isLoggedIn} = require("../ultis/isLoggedIn.js");
const {feedbackSchema} =require("../ultis/schema.js");
const multer  = require("multer");
const {storage} = require("../ultis/cloudinary.js");
const upload = multer({ storage });



// feedbackpage route
router.get("/",isLoggedIn,
    WarpAsync(async(req,res)=>{
    const feedbackInfo = await Feedback.find({});
    res.render("feedbackpage.ejs",{feedbackInfo});
}));

// feedback form route
router.get("/new",WarpAsync((req,res)=>{
    res.render("feedbackform.ejs");
}))

// feedback form post route
router.post("/",upload.single("image"),WarpAsync(async(req,res)=>{
    let data = req.body;
    let {path,filename} =req.file;
    let {error} = feedbackSchema.validate(data);
    if(error){
        throw new ExpressError(400,error.message);
    }

    const feedback = new Feedback({...data});
    feedback.image = {path,filename};
    await feedback.save();
    req.flash("success","Feedback Submitted Successfully");
    res.redirect("/feedback");
}));

// feedback delete route
router.delete("/:id",WarpAsync(async(req,res)=>{
    let {id} = req.params;
    let deleteFeedback = await Feedback.findByIdAndDelete(id);
    req.flash("success",`Feedback of ${deleteFeedback.username} has been deleted !!`);
    res.redirect("/feedback");
}));

module.exports = router;