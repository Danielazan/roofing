const express = require("express")

const {
    DeleteInvent,
    UpdateInvent,
    createInvent,
    GetAllInvent
} = require("../Controllers/InventryController")

const router= express.Router()

router.get("/inventry/:id", GetAllInvent)

router.post("/inventry", createInvent)

router.patch("/inventry/:id", UpdateInvent)

router.post("/fillinventry", Fillinventry)

 router.delete("/inventry/:id", DeleteInvent)


module.exports = router