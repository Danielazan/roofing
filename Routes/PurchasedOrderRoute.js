const express = require("express")

const {
    DeleteOrder,
    UpdateOrder,
    createOrder,
    GetAllOrder
}= require("../Controllers/PurchaseOrderController")

const router = express.Router()

router.get("/order", GetAllOrder)
 router.post("/report",createOrder )
 router.delete("/order", DeleteOrder)
 router.patch("/order", UpdateOrder)


module.exports=router
