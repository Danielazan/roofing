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
        min: 0
    },
    StockOut:{
        type:Number,
        
    },
    Balance:{
        type:Number,
    },
    Profit:{
        type:Number
    }
   
},{timestamps:true})

module.exports= mongoose.model("Batch", batchSchema)