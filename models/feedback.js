const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    feedback:{
        type : String,
        required : true
    },
    rating:{
        type : Number,
        required : true
    }
    ,image:{
        path:String,
        filename:String
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;