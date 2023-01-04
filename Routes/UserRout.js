const express = require("express")

const {
    signup,
    verify,
    resend,
    Login,
    GetUsers,
    MakeSalesPerson,
    RemoveSalesPerson
} = require("../Controllers/UserController") 



const router = express.Router()

//signup 
router.post("/signup",signup)

router.post("/verifyOtp", verify )

router.post("/resendotp", resend)

router.post("/login", Login)

router.get("/users", GetUsers)

router.patch("/user", MakeSalesPerson)

router.patch("/ReUser", RemoveSalesPerson)

module.exports= router