const mongoose = require("mongoose")

const Invent = require("../Model/PurchaseOrderModel")

const GetAllOrder= async (req, res)=>{
    
    try {
        const Invent = await Invent.find({}).sort({createdAt:-1})

        res.status(200).json(Invent)

    } 
    catch (error) {
        return error ? res.status(400).json({error:error.message}) : null
    }
}


const createInvent= async (req,res)=>{
    const {
       Name,
       Inventries
    }=req.body


    try {

        const CreateInvent= await Invent.create({
            Name,
            Inventries
            })

       

        res.status (200).json(CreateInvent)
    }

    catch (error){
        if(error){
            res.status(400).json({error:error.message})
        }
    }
}


  const UpdateInvent = async (req, res)=>{
    const {id}= req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json(
                {error:"Such Enquiry does not exist"}
            )
        }
        const Invent = await Invent.findOneAndUpdate({_id:id},{
            ...req.body
        })
    
        if (!Invent){
            return res.status(400).json({error:'No such Information Exist'})
        }
    
        res.status(200).json(Invent)
    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}

const DeleteInvent = async(req,res)=>{
    const {id} = req.params
    try {
  
  const pro = await Invent.findOneAndDelete({_id:id})

  if(!pro){
      return res.status(400).json({error:"products does not Exist"})
  }
  res.status(200).json(pro)
    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}


// Get A Single Customer




module.exports={
    DeleteInvent,
    UpdateInvent,
    createInvent,
    GetAllInvent
} 