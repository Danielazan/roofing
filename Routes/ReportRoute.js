const express = require("express")

const {
    SendReport,
    GetReport,
    SendPdfReport
}= require("../Controllers/Report")

const router = express.Router()

router.get("/GetReport", GetReport)
 router.get("/report",SendReport )
 router.post("/report", SendPdfReport)


module.exports=router
