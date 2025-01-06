module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.url=req.originalUrl;
        req.flash("error","You Must Login First !!")
        res.redirect("/login");
    }
    next();
}


module.exports. originalUrl =(req,res,next)=>{
    if(req.session.url){
        res.locals.path=req.session.url;
    }
    next();
}

