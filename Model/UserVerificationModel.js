const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserVerificationSchema = new schema({
    UserId:String, // referred to the automatic generated id of the user model
    otp:String,  // this will be a randomly generated string for a particular user who is about to verifiy the accout
    createdAt:Date,
    expiredAt:Date,
})



module.exports= mongoose.model("UserVerification", UserVerificationSchema)