const express = require("express")

const {
    createBatch,
    UpdatePrevious,
    UpdateTotal,
    UpdateCreateBatch,
    GetAllBatch
} = require("../Controllers/BatchController")

const router= express.Router()

router.get("/batches/:MaterialName", GetAllBatch)

router.post("/batch/:id", createBatch)

router.patch("/batches/:id", UpdatePrevious)

router.post("/Tbatch/:id", UpdateTotal)

router.post("/upCreate/:id", UpdateCreateBatch)

// router.get("/enquiry",  GetEnquiry)

// router.get("/enquiry/:id", GetSingleEnquiry )

// router.patch("/enquiry/:id", UpdateEnquirys)

// router.delete("/enquiry/:id", DeleteEnquiry)

module.exports = router