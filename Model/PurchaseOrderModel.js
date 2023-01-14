const mongoose = require("mongoose")

const schema = mongoose.Schema


const OrderSchema = new schema ({
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        
    },
    TotalAmount:{
        type:Number,
    },
    Price:{
        type:Number
    },
    itemsOrdered:[]
   
},{timestamps:true})

module.exports= mongoose.model("PurchaseOrder", OrderSchema)