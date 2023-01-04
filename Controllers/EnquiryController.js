const mongoose = require("mongoose")

const asking = require("../Model/EnquiryModel")

const createEnquiry= async (req,res)=>{

    const {
        Name,
        PhoneNumber,
        enquiry,
        WalkInOrCall
    }=req.body

    try {
        const createEnquirys = await asking.create({
            Name,
        PhoneNumber,
        enquiry,
        WalkInOrCall})

        res.status (200).json(createEnquirys)
    }

    catch (error){
        if(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Get A Single Enquiry

const GetSingleEnquiry = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Enquiry Exist"})
    }

    const Enquiry = await asking.findById(id)

    if (!Enquiry){
        res.status(404).json({error:"No such Enquiry Exist"})
    }

    res.status(200).json(Enquiry)
}

// Get All Enquiry

const GetEnquiry = async (req, res)=>{
    const Enquiry = await asking.find({}).sort({createdAt:-1})

    res.status(200).json(Enquiry)
}


const DeleteEnquiry = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Information does not Exist'})
    }

    const Enquiry = await asking.findOneAndDelete({_id:id})

    if(!Enquiry){
        return res.status(400).json({error:"Information does not Exist"})
    }
    res.status(200).json(Enquiry)
}

const UpdateEnquirys= async (req,res)=>{
    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(
            {error:"Such Enquiry does not exist"}
        )
    }
    const Enquiry = await asking.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!Enquiry){
        return res.status(400).json({error:'No such Information Exist'})
    }

    res.status(200).json(Enquiry)
}

module.exports={
    createEnquiry,
    GetSingleEnquiry,
    GetEnquiry,
    DeleteEnquiry,
    UpdateEnquirys
}


