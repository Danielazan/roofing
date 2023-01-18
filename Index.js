const express =require("express")

const cron = require("node-cron")

const mongoose = require("mongoose")
const cors = require("cors")

const bodyParser = require('body-parser')

const validationRoute = require("./Routes/UserRout")

const material= require("./Routes/ProductsMaterialRoute")

 const matpro = require("./Routes/MaterialProductsRoute")

// const Materials = require("./Routes/MaterialRoute")

const Customers = require("./Routes/CustomerRoute")

const Enquiry= require("./Routes/EnquiryRoute")

const Report = require("./Routes/ReportRoute")

const {SendReport}=require("./Controllers/Report")

const Batch = require("./Routes/BatchRoute")

const Refund = require("./Routes/RefundRoute")

const Order = require("./Routes/PurchasedOrderRoute")

require("dotenv").config()

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(cors())

app.use("/api",Report)

const task = cron.schedule('30 16 * * *',SendReport, {
    scheduled: false,
    timezone: "Africa/Lagos"
  })
 task.start()

app.use("/api",validationRoute)

app.use("/api", matpro)

app.use("/api", Refund)

app.use("/api", material)    

app.use("/api", Customers)

app.use("/api", Enquiry)

app.use("/api", Batch)

mongoose.connect(process.env.MONOURL)
.then( ()=>{

    app.listen(process.env.PORT, (req,res)=>{
        console.log("database connected..... listening on port 5000")
    })
})
.catch((err)=>{
    console.log(err)
})
