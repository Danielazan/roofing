const express = require("express")

const {
    createCustomer,
    GetSingleCustomer,
    GetCustomer,
    DeleteCustomer,
    UpdateCustomers,
    GetNonSuppliedCustomer,
    Supplied
} = require("../Controllers/CustomerController")

const router= express.Router()

router.post("/customer", createCustomer)

router.get("/customer",  GetCustomer)

router.get("/customer/:id", GetSingleCustomer )

router.patch("/customer/:id", UpdateCustomers)

router.delete("/customer/:id", DeleteCustomer)

router.get("/NotSupplied", GetNonSuppliedCustomer)

router.patch("/Supplied/:id", Supplied)

module.exports = router