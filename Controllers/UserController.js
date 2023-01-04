const express = require("express")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const {v4:uuidv4} = require("uuid")  // the  uuid has a file model called version4(v4) and that is what we need in our application and while importing it we want to reffer to it 

// Reuseable function to generate Token
const CreateToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:"3d"})
}

require("dotenv").config()
const router = express.Router()
const UserModel = require("../Model/UserModel")

const verificationModel = require("../Model/UserVerificationModel")

// create A nodemailer transpoter
let transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.Email,
        pass:process.env.pass,
    }
})
//testing success
transpoter.verify((error,success)=>{
    if(error){
        console.log(error)
    }else{
        console.log("ready for messages....success")
    }
})


//Sign up 

const signup=async(req,res)=>{
    const {name,email,password}= req.body

    try {
       // checking if user exist

    const exist = await UserModel.findOne({email})
        
        if(!email || !password){
            throw Error("All field must be filled")
        }

        if (!validator.isEmail(email)){
            throw Error("Email not Valid")
        }
        // if (!validator.isStrongPassword(password)){
        //     throw Error ("password is not Strong enough")
        // }
    if(exist){
        throw Error ("Email already exist")
    }
    // const salt = bcrypt.genSalt(10)
    const salt= await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)
    
    const user = await UserModel.create({
        name,
        email,
        password:hash,
        verified:false,
        isAdmin:false,
        isSalesPerson:false
    }).then(result=>{
         
        sendVerification(result,res)
        const token =  CreateToken(result._id)
        const id=result._id
        res.status(200).json({email,id,token})
    })

    
     
        // res.status(200).json({User})
    } 
    catch (error) {
        res.status(400).json({error:error.message})
    }
}

const sendVerification= async ({_id,email},res)=>{
    try {
        const otp= `${Math.floor(1000 + Math.random() * 9000)}`

        // console.log(otp)
        // setting up options for the email
        const options= {
            from:process.env.Email,
            to:email,
            subject:"Verify your email",
            html:`<p>Enter <b> ${otp} </b> in the app to verify your email adress and complete the signup</p>
                <p> this code will <b>expire in 1 hour</b></p>
            `
        }
        // storing the otp

        const saltRounds =  await bcrypt.genSalt(10)

        const hashCode = await bcrypt.hash(otp, saltRounds)

        // console.log(hashCode)

        const code = await verificationModel.create({
            UserId:_id,
            otp:hashCode,
            createdAt:Date.now(),
            expiredAt:Date.now() + 3600000
        })
        console.log(code)

        await transpoter.sendMail(options)

        // res.json({
        //     status:"PENDING",
        //     message:"verification otp email sent",
        //     data:{
        //         userId:_id,
        //         email,
        //     }
        // })
    } 
    catch (error) {
        res.status(400).json({error:error.message})
    }
}

// verification route

const verify = async(req, res)=>{
    try {
        // we expect to recieve the userId and the otp
        let {userId, otp} = req.body

        // check if they are empty
        if (!userId || !otp){
            throw Error("empty otp details are not allowed")
        }
        const records= await verificationModel.find({
            userId,
        })

        if (records.length <= 0){
            // n o record found
            throw new Error("the account is either invaild or has been verified already, Hence signup or login")
        }

        const {expiredAt} = records[0];
        const hashCode = records[0].otp

        //checking if the expiredAt is more than 1 hr

        if (expiredAt < Date.now()){
            // user record has expired
            await verificationModel.deleteMany({userId})
            throw new Error("code has expired. please verify again")
        }

        // check if the code is correct

        const validcode = await bcrypt.compare(otp, hashCode)

        if (!validcode){
            // wrong otp
            throw new Error("invaid code passed. check your code inbox again")
        }
        await UserModel.findOneAndUpdate({_id:userId}, {verified:true})

       await verificationModel.findOneAndDelete({userId})

        res.json({
            status:'VERIFIED',
            message:"user email verified successfully"
        })
    } 
    catch (error) {
        res.json ({
            status:"Failed",
            message:error.message
        })
    }
}

const MakeSalesPerson = async (req,res)=>{
    try {
        const {email}= req.body

    if (!email){
        throw Error ("All fields must be filled with the correct details")
    }

    const user = await UserModel.findOne({email:email})

    if (!user){
        throw Error ("Incorrect Email")
    }

    if (!user.verified){
        throw Error ("Email has not been Verified")
    }
    const added = await UserModel.findOneAndUpdate({email:email}, {isSalesPerson:true})

    res.status(200).json(added)
    } catch (error) {
        error ? res.status(400).json({error:error.message}) : null
    }
}

const RemoveSalesPerson = async (req,res)=>{
    try {
        const {email}= req.body

    if (!email){
        throw Error ("All fields must be filled with the correct details")
    }

    const user = await UserModel.findOne({email:email})

    if (!user){
        throw Error ("Incorrect Email")
    }

    if (!user.verified){
        throw Error ("Email has not been Verified")
    }
    const added = await UserModel.findOneAndUpdate({email:email}, {isSalesPerson:false})

    res.status(200).json(added)
    } catch (error) {
        error ? res.status(400).json({error:error.message}) : null
    }
}

const GetUsers = async (req, res)=>{
    try {
        const User = await UserModel.find({}).sort({createdAt:-1})

    res.status(200).json(User)
    } 
    catch (error) {
        return(
            error ? res.status(400).json({error:error.message}) : null
        )
    }
}

const resend = async (req, res)=>{
    try {
        let { userId, email} = req.body

        if (!userId || !email){
            throw Error ("empty details are not allowed")
        }

        await verificationModel.deleteMany({userId})
        sendVerification ({_id:userId, email}, res)
    } 
    catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
}

// login User 
const Login = async (req, res)=>{
    try {
        const {email, password }= req.body

    if (!email || !password){
        throw Error ("All fields must be filled with the correct details")
    }

    const user = await UserModel.findOne({email})

    if (!user){
        throw Error ("Incorrect Email")
    }

    const match = await bcrypt.compare(password,user.password)

    if (!match){
        throw Error ("incorrect password")
    }

    if (!user.verified){
        throw Error ("Email has not been Verified")
    }

    const token = CreateToken(user._id)

    res.status(200).json({user, token})
    } catch (error) {
        error ? res.status(400).json({error:error.message}) : null
    }
}

module.exports={
    signup,
    verify,
    resend,
    Login,
    GetUsers,
    MakeSalesPerson,
    RemoveSalesPerson
}