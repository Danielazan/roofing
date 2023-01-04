const express = require("express")

const {
    GetandPopulateProducts,
    updateProduct
}= require("../Controllers/MaterialProductsController")

const router = express.Router()

//router.post ("/matpro", createMateriall)

// router.post("/produts",createProduct )

// router.put("/produts/:id", updateProduct)

 router.get("/productss/:name",GetandPopulateProducts)

 router.get("/productss",updateProduct)

module.exports=router
