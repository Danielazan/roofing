const mongoose = require("mongoose")

const Schema = mongoose.Schema

const enquirySchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    enquiry:{
        type:String,
        required:true
    },
    WalkInOrCall:{
        type:String,
        required:true
    }
},{timestamps:true})



module.exports= mongoose.model("Enquiry", enquirySchema)
