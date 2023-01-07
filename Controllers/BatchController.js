const mongoose = require("mongoose")


const Customer = require("../Model/CustomerModel")
const {material} =require("../Model/ProductsMaterialModel")

const BatchModel= require("../Model/BatchModel")


const GetAllBatch= async (req, res)=>{
    const {MaterialName} = req.params
    try {
        const batch = await BatchModel.find({MaterialName:MaterialName}).sort({createdAt:-1})

        res.status(200).json(batch)

    } 
    catch (error) {
        
    }
}

// for updating previous batch with totalbatch remaining


const UpdatePrevious= async (req, res)=>{

    try {
        const {id} =req.params
        const {Stock, M_Name} = req.body

        const P_batch = await material.findById({_id:id})

        const T_batch = await P_batch.TotalBatch

        if (T_batch == 0){
            await material.findOneAndUpdate({Name:M_Name}, {PreviousBatch:Stock})
        }

        const Done = await material.findOneAndUpdate({Name:M_Name}, {PreviousBatch:T_batch})

        console.log(id)
        res.status(200).json(Done)
    } catch (error) {
        return error ? res.status(400).json({error:error.message}) :null
    }
}
const UpdateTotal = async (req, res)=>{
    console.log ("ok")
    try {
        const {id} = req.params
        const {Stock} = req.body

        const P_batch = await material.findById({_id:id})

        const T_batch=await P_batch.PreviousBatch 

        const total =await  Number(T_batch) + Number(Stock)

        const Done = await material.findOneAndUpdate({_id:id}, {TotalBatch:total})

        res.status(200).json(Done)
    } catch (error) {
        return error ? res.status(400).json({error:error.message}) : null
    }
}
const createBatch= async (req,res)=>{

    const {id}= req.params
    const {
        RefNo,
        MaterialName,
        StockIn
    }=req.body


    try {

         // to check if the id is a valid id

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json(
                {error:"Such Mat does not exist"}
            )
        }

      
         // then update the material with the new total batch and stock in 
         await material.findOneAndUpdate({_id:id}, { NewBatch:StockIn})

        const reb= await material.findOne({_id:id},)

        const T_Bal = await Number(reb.TotalBatch)

        console.log(T_Bal)
      
        //res.status(200).json(T_Bal)

        const Createbatch= await BatchModel.create({
            RefNo,
            MaterialName,
            StockIn,
        Balance:T_Bal})

       

        res.status (200).json(Createbatch)
    }

    catch (error){
        if(error){
            res.status(400).json({error:error.message})
        }
    }
}

const UpdateCreateBatch = async(req, res)=>{
    try {
        const {id}= req.params
        const {
            MaterialName,
            StockOut, 
        } = req.body
        
        const Batches= await BatchModel.findOne({MaterialName:MaterialName}).sort({createdAt:-1})

       const mark = await material.findById({_id:id})

        const Batch = await BatchModel.create({
        RefNo:Batches.RefNo,
        MaterialName,
        StockOut,
        Balance:mark.TotalBatch
        })

        res.status(200).json(Batch)
    }  
    catch (error) {
        return error ? res.status(400).json({error:error.message}) :null
    }
}

// Get A Single Customer



module.exports={
    createBatch,
    UpdatePrevious,
    UpdateTotal,
    UpdateCreateBatch,
    GetAllBatch
} 