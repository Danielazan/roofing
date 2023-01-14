const xlsx = require("xlsx")
const Customers = require("../Model/CustomerModel")
const nodemailer = require("nodemailer")
const Excel = require('exceljs');
const cron = require("node-cron")

let transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.Email,
        pass:process.env.pass,
    }
})

 transpoter.verify((error,success)=>{
    if(error){
        console.log(error)
    }else{
        console.log("ready for messages....success")
    }
})

const GetReport = async(req, res)=>{
    try {
        let start = new Date();
                start.setHours(0,0,0,0);

                let end = new Date();
                end.setHours(23,59,59,999)
                
        const pro =await Customers.aggregate([
            { $match: { createdAt: {$gte: start, $lt: end} } },
            // {$project:{_id:0}},
            // {$unwind:"$itemsBought"},
          ])

          res.status(200).json(pro)
    } catch (error) {
        return error ? res.status(400).json({error:error.message}) : null
    }
}
const SendReport = async (req,res)=>{
        try {
            const filename = 'CustomerDetails.xlsx';

           
            const email = "danfrancix@gmail.com" 
            
            const mailOptions = {
                from: process.env.Email,
                to: email,
                subject: 'Sale Report',
                html: `<p>Enter in the app to verify your email adress and complete the signup</p>
                <p> this code will <b>expire in 1 hour</b></p>
            `,
                attachments: [
                    {
                        filename,
                        content: buffer,
                        contentType:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                ],
            };
            await transpoter.sendMail(mailOptions);

            res.status(200).json(pro)
        } 
        catch (error) {
            // return(
            //     error ? res.status(400).json({error:error.message}) : null
            // )
        }
}



module.exports = {SendReport, GetReport}