const mongoose = require("mongoose")

const RefundModel = require("../Model/RefundModel")

const Customer = require("../Model/CustomerModel")


// const BatchModel= require("../Model/BatchModel")

// const GetAllRecipt= async (req, res)=>{
    
//     try {
//         const order = await Order.find({}).sort({createdAt:-1})

//         res.status(200).json(order)

//     } 
//     catch (error) {
//         return error ? res.status(400).json({error:error.message}) : null
//     }
// }

// for creating refunds 
const CreateRefund = async (req,res)=>{
    const {Name, InvoiceNo, Amount, ItemsRefunded} =req.body
    try {
        const CreateRefund= await RefundModel.create({
            Name,
            InvoiceNo,
            Amount,
            ItemsRefunded})

       

        res.status (200).json(CreateRefund)

    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}

// for updating the refunds with the correct invoice number

const FillRefund = async (req, res)=>{
    const {invoiceNo} = req.body
    try {
        const fillrefund = await RefundModel.find({InvoiceNo:invoiceNo})

        const cus = await Customer.findOneAndUpdate({InvoiceNumber:invoiceNo}, {Refunds:fillrefund})

        res.status(200).json(cus)

    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}


// for editing  a particular refund

const UpdateRefund = async (req, res)=>{
    const {id}= req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json(
                {error:"Such Enquiry does not exist"}
            )
        }
        const refund = await RefundModel.findOneAndUpdate({_id:id},{
            ...req.body
        })
    
        if (!refund){
            return res.status(400).json({error:'No such Information Exist'})
        }
    
        res.status(200).json(refund)
    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}


// for deleting a particular refund

const DeleteRefund = async(req,res)=>{
    const {id} = req.params
    try {
  
  const pro = await RefundModel.findOneAndDelete({_id:id})

  if(!pro){
      return res.status(400).json({error:"products does not Exist"})
  }
  res.status(200).json(pro)
    } catch (error) {
       return error ? res.status(400).json({error:error.message}) : null 
    }
}

module.exports={
    CreateRefund,
    FillRefund,
    DeleteRefund,
    UpdateRefund
} 