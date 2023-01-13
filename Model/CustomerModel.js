const mongoose = require("mongoose")

const schema = mongoose.Schema


const customerSchema = new schema ({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    InvoiceNumber:{
        type:String,
        required:true,
        unique:true
    },
    Refunds:[],
    PaymentMethod:{
        type:String,
        required:true,
    },
    DriverName:{
        type:String,
        required:true
    },
    SiteLocation:{
        type:String,
        required:true
    },
    supplied:{
        type:String, 
        default: "Not supplied"
    },
    DateOfSupplied:{
        type:Date
    },
    itemsBought:[],
        
    TotalAmountPaid:{
        type:Number,
        required:true
    },
    Profit_Loss:{
        type:String
    },
    RecievedBy:{
        type:String,
        required:true
    },
},{timestamps:true})

module.exports= mongoose.model("Customers", customerSchema)