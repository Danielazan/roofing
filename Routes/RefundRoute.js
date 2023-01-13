const express = require("express")

const {
    CreateRefund,
    FillRefund,
    DeleteRefund,
    UpdateRefund
} = require("../Controllers/RefundController")

const router= express.Router()

//router.get("/batches/:MaterialName", GetAllBatch)

router.post("/refund", CreateRefund)

router.patch("/refund/:id", UpdateRefund)

router.post("/fillrefund", FillRefund)

 router.delete("/refund/:id", DeleteRefund)


module.exports = router