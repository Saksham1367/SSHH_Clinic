
const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    number:{
        type : Number,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true,
        enum: ["male", "female", "others", "nan"]
    },
    disease:{
        type : String,
        required : true    
    },
    time:{
        type : String,
        required : true
    },
});

const Consult = mongoose.model("Consult", consultSchema);
module.exports = Consult;