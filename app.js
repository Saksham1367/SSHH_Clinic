if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express =require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const ejsMate = require("ejs-mate");
const WarpAsync =require("./ultis/warpasync");
const ExpressError =require("./ultis/expresserror.js");
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
    await mongoose.connect("mongodb://127.0.0.1:27017//clinic");
}

main()
.then((result)=>{
    console.log("Connected With MongoDB Server");
}).catch((err)=>{
    console.log(err);
})


// signup page
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
    console.log(req.body);
    res.send("Signup data received");
});

// login page
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.send("Login data received");
});

//consult page
app.get("/consult", (req, res) => {
    res.render("consult.ejs");
}); 

app.post("/consult", (req, res) => {
    console.log(req.body);
    res.send("Form data received");
})

// home page 
app.get("/",WarpAsync((req,res,next)=>{
    res.render("homepage.ejs");
}))



// error handling for page not found
app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page Not found!!"));
})

// error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong !!"} =err;
    res.render("error.ejs",{message});
})
