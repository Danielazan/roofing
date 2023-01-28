const mongoose = require("mongoose")
import Inventry from './../../New/src/Pages/SalesComponent/Inventry';

const Schema = mongoose.Schema

constinventrySchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
    Inventries:[]
},{timestamps:true})



module.exports= mongoose.model("Inventry",inventrySchema)
