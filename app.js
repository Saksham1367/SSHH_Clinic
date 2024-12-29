const express =require("express");
const app = express();
//const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const path = require("path");
const ejsMate = require("ejs-mate");
const WarpAsync =require("./ultis/warpasync");
const ExpressError =require("./ultis/expresserror.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);




app.listen(3000,()=>{
    console.log("server is listening to port no: 3000");
});

// home page 
app.get("/",WarpAsync((req,res,next)=>{
    res.render("homepage.ejs");
}))

// setting up mongoose
/*async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/clinic");
}

main()
.then((result)=>{
    console.log("Connected With MongoDB Server");
}).catch((err)=>{
    console.log(err);
})
*/

// error handling for page not found
app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page Not found!!"));
})

// error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong !!"} =err;
    res.render("error.ejs",{message});
})
