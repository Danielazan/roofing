const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MaterialSchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
    collectionName:{
        type:String,
        required:true
    },
    RefNo:{
        type:Number,
        default:0
    },
    Price:{
        type:Number,
        required:true
    }, 
    Quantity:{
        type:Number,
        default: 0,
        min: 0
    },
    PreviousBatch:{
        type:Number,
        default: 0
    },
    NewBatch:{
        type:Number,
        default:1 ,
        min: 1 
    },
    TotalBatch:{
        type:Number,
        default: 0,
        min: 0
    },
    QuantitiySold:[],

    customers:[]
},{timestamps:true})

const ProductSchema = new Schema({
    collectionName:{
        type:String
    },
    materialss:[]

},{timestamps:true})

const material = mongoose.model("materials", MaterialSchema)

const products = mongoose.model("products", ProductSchema)

module.exports= {
    material,
    products
}