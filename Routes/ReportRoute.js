const express = require("express")

const {
    SendReport,
    GetReport
}= require("../Controllers/Report")

const router = express.Router()

router.get("/GetReport", GetReport)
 router.get("/report",SendReport )


module.exports=router
