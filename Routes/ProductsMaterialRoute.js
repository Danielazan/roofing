const express = require("express")

const {
    GetMaterials,
    GetProducts,
    createMaterial,
    createProduct,
    UpdateMaterial,
    DeleteMaterial,
    GetandPopulateProducts,
    DeleteProducts,
    matcus,
    updateBatch
}= require("../Controllers/ProductMaterialController")

const router = express.Router()

router.get("/material", GetMaterials)

router.get("/products", GetProducts)

router.post ("/material", createMaterial)

router.post("/products",createProduct )

router.get("/products/:name",GetandPopulateProducts)

router.delete('/material/:id', DeleteMaterial)

router.patch("/material/:id", UpdateMaterial)

router.delete('/products/:name', DeleteProducts)

router.patch("/materialCustomer",matcus)

router.patch("/Batch/:id", updateBatch)


module.exports=router
