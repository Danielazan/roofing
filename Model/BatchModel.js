const mongoose = require("mongoose")

const schema = mongoose.Schema


const batchSchema = new schema ({
    MaterialName:{
        type:String,
        required:true
    },
    RefNo:{
        type:Number,
        required:true
    },
    StockIn:{
        type:Number,
        default:0,
        min: 0
    },
    StockOut:{
        type:Number,
        default: 0,
    },
    Balance:{
        type:Number,
    },
   
},{timestamps:true})

module.exports= mongoose.model("Batch", batchSchema)