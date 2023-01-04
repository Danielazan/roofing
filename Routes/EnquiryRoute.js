const express = require("express")

const {
    createEnquiry,
    GetSingleEnquiry,
    GetEnquiry,
    DeleteEnquiry,
    UpdateEnquirys
} = require("../Controllers/EnquiryController")

const router= express.Router()

router.post("/enquiry", createEnquiry)

router.get("/enquiry",  GetEnquiry)

router.get("/enquiry/:id", GetSingleEnquiry )

router.patch("/enquiry/:id", UpdateEnquirys)

router.delete("/enquiry/:id", DeleteEnquiry)

module.exports = router