const mongoose = require("mongoose")

const Order = require("../Model/PurchaseOrderModel")

const GetAllOrder= async (req, res)=>{
    
    try {
        const order = await Order.find({}).sort({createdAt:-1})

        res.status(200).json(order)

    } 
    catch (error) {
        return error ? res.status(400).json({error:error.message}) : null
    }
}


const createOrder= async (req,res)=>{
    const {
       Name,
       Address,
       PhoneNumber,
       Email,
       TotalAmount,
       Price,
       itemsOrdered
    }=req.body


    try {

        const CreateOrder= await Order.create({
            Name,
            Address,
            PhoneNumber,
            Email,
            TotalAmount,
            Price,
            itemsOrdered
            })

       

        res.status (200).json(CreateOrder)
    }

    catch (error){
        if(error){
            res.status(400).json({error:error.message})
        }
    }
}


  const UpdateOrder = async (req, res)=>{
    const {id}= req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json(
                {error:"Such Enquiry does not exist"}
            )
        }
        const order = await Order.findOneAndUpdate({_id:id},{
            ...req.body
        })
    
        if (!order){
            return res.status(400).json({error:'No such Information Exist'})
        }
    
        res.status(200).json(order)
    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}

const DeleteOrder = async(req,res)=>{
    const {id} = req.params
    try {
  
  const pro = await Order.findOneAndDelete({_id:id})

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
    createBatch,
    UpdatePrevious,
    UpdateTotal,
    UpdateCreateBatch,
    GetAllBatch
} 