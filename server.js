const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "andhaadhiwebsite@gmail.com",
        pass: `mpeqmkotjnktfvzh`,
    },
});
app.post("/api/contact", (req, res) => {
    const { fullname, email, message } = req.body;

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${fullname}</li>
            <li>Email: ${email}</li>
            </ul>
            <h3>Message</h3>
            <p>${message}</p>
            `;


    let mailOptions = {
        from: "<andhaadhiwebsite@gmail.com>",
        to: "andhaadhiwebsite@gmail.com",
        subject: "Customer Contact Request",
        text: "Hello world?",
        html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        try {
            res.json("Email has been sent");
            console.log("Email has been sent");
        } catch (error) {
            console.log(error);
        }
    });
});
app.post("/api/bookslot", (req, res) => {

    const output = `
        <p>${req.body.doctorDetails.name}, you have recieved a new slot booking request</p>
        <br/>
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
        <p>Request for ${req.body.slot.name}</p>
        <br/>
        <p>Kindly the contact the patient as soon as possible</p>
            `;


    let mailOptions = {
        from: "<andhaadhiwebsite@gmail.com>",
        to: ["andhaadhiwebsite@gmail.com", req.body.doctorDetails.email],
        subject: `New booking from ${req.body.name}`,
        html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        try {
            console.log("Email has been sent");
        } catch (error) {
            console.log(error);
        }
    });
    const output1 = `
        <p>Your request has been raised successfully. Your prefered doctor will contact you soon.</p>
        <br/>
        <p>Regards,</p>
        <p>Andhaadhi Rehab</p>
            `;


    let mailOptions1 = {
        from: "<andhaadhiwebsite@gmail.com>",
        to: req.body.email,
        subject: `New booking from ${req.body.name}`,
        html: output1,
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        try {
            console.log("Email has been sent");
        } catch (error) {
            console.log(error);
        }
    });
    res.json("ok");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
