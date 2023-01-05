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

            // find a material by id 
         const reb = await material.findById({_id:id})
      
         // then update the previous batch with the former totol batch
         if(reb){
           await material.findOneAndUpdate({_id:id}, {PreviousBatch:reb.TotalBatch})

         }
         await material.findOneAndUpdate({_id:id}, {PreviousBatch:reb.TotalBatch})
         
         // again find the material by id
          const Neb=  await material.findById({_id:id})
      
         // sum the previous batch with the new amount of stock coming in

         await Number(reb.PreviousBatch) + Number(StockIn)

         const total = await Number(reb.PreviousBatch) + Number(StockIn)
      
         // then update the material with the new total batch and stock in 
         await material.findOneAndUpdate({_id:id}, {TotalBatch:total, NewBatch:StockIn})

         await material.findOneAndUpdate({_id:id}, {TotalBatch:total, NewBatch:StockIn})
      
        //res.status(200).json(total)

        const Createbatch= await BatchModel.create({
            RefNo,
            MaterialName,
            StockIn,
        Balance:total})

        const mark = await material.findOneAndUpdate({_id:id}, {RefNo:Createbatch.RefNo})

        console.log(mark)

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
    UpdateCreateBatch,
    GetAllBatch
} 