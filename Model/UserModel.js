const mongoose = require("mongoose")
const schema = mongoose.Schema
const bcrypt = require("bcrypt")

const UserSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    //add another property to the schema which is booloen value with an initial value of false
    verified:Boolean,
    isAdmin:Boolean,
    isSalesPerson:Boolean,
})

//static signup method
UserSchema.statics.signup = async function(name,email,password,dateofbirth){
    // checking if user exist

    const exist = await this.findOne({email})

    if(exist){
        throw Error ("Email already exist")
    }
    // const salt = bcrypt.genSalt(10)
    const salt= 10

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password:hash,dateofbirth}).then(result=>{
        console.log("created")
    })


    return user

}



module.exports=mongoose.model("User" ,UserSchema)