const mongoose = require("mongoose")
const Customer = require("../Model/CustomerModel")

const {
    material,
    products
}= require("../Model/ProductsMaterialModel")


const GetandPopulateProducts = async (req, res)=>{
  try {
    const {name} = req.params

    const mat=await material.find({collectionName:name})
     
    //console.log(mat)
    const pro = await products.findOneAndUpdate({collectionName:name},{materialss:mat} )

    console.log(pro)
    res.status(200).json(pro)
  } 
  catch (error) {
    return(
      error ? res.status(400).json({error:error.message}) : null
    )
  }
}

const updateProduct = async (req, res)=>{
  try {
    const materialName= "chopper"

    const ava = await Customer.aggregate([
      {$project:{_id:0}},
      {$unwind:"$itemsBought"},
      {
        $group:
          {
            _id: "$itemsBought.item",
             totalAmount: { $sum: "$itemsBought.quantity" },
          }
      },
       {$match:{"_id":{$eq: materialName}} },
    ])
  
     //const  :ava})

     const root = await material.findOneAndUpdate({Name:materialName},{QuantitiyAvaliable:ava})
     
    res.json(root)
  } 
  catch (error) {
    return(
      error ? res.status(400).json({error:error.message}) :null
      
    )
    console.log(error)
    
  }
}

module.exports={
  GetandPopulateProducts,
  updateProduct
}