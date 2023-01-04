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

            let workbook = new Excel.Workbook();

            let worksheet1 = workbook.addWorksheet('Customer');

            let worksheet2= workbook.addWorksheet("ItemBought")

            worksheet1.columns = [
                {header: 'First Name', key: 'FirstName', width: 22},
                {header: 'Last Name', key: 'LastName', width: 22},
                {header: 'Phone Number', key: 'PhoneNumber' ,width: 22},
                {header: 'Invoice Number', key: 'InvoiceNumber', width: 22},
                {header: 'Payment Method', key: 'PaymentMethod',width: 22},
                {header: 'Driver Name', key: 'DriverName', width: 22},
                {header: '"Site Location', key: 'SiteLocation', width: 22},
                {header: 'Items Bought', key: 'itemsBought', width: 100 },
                {header: 'supplied', key: 'supplied' , width: 30},
                {header: 'Date Supplied', key: 'updatedAt', width: 22},
                {header: 'Not Supplied', key: 'NotSupplied', width: 22},
                {header: 'Date NotSupplied', key: 'updatedAt',width: 22},
                {header: 'Total Amount Paid', key: 'TotalAmountPaid', width: 20},
                {header: 'created At', key: 'createdAt' , width: 30},
            ];

            worksheet2.columns = [
                // {header: 'ID', key: '_id', width:1000},
                {header: 'Item', key: 'Item', width:1000},
            ];

            let start = new Date();
                start.setHours(0,0,0,0);

                let end = new Date();
                end.setHours(23,59,59,999);

               console.log(start)

            //const report = await Customers.find({createdAt:{$gte: start, $lt: end}}).sort({createdAt:-1})

            const pro =await Customers.aggregate([
                { $match: { createdAt: {$gte: start, $lt: end} } },
                {$project:{_id:0}},
                {$unwind:"$itemsBought"},
              ])
            

            await pro.map((e) => {
                worksheet1.addRow(e);
            });
            const buffer = await workbook.xlsx.writeBuffer();

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