const mongoose = require("mongoose")

const schema = mongoose.Schema


const RefundSchema = new schema ({
    Name:{
        type:String,
        required:true
    },
    InvoiceNo:{
        type:Number,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    ItemsRefunded:[]
   
},{timestamps:true})

module.exports= mongoose.model("Refunds", RefundSchema)