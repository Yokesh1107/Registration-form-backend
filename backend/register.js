const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require("body-parser");
const path = require('path')
const app = express()
var QRCode = require('qrcode')
const cors = require('cors')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// app.use(express.static('public'));
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5500' }))
const Register = require('./registerModel')
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uit20227@rmd.ac.in',
        pass: 'Yokesh1124'
    }
});
app.listen(2003, () => {
    console.log("Server running")
})
app.post('/register', async (req, res) => {
    console.log(req.body)
    const { teamleader, team1, team2, team3, clg, dept, year, mail, event1, event2, event3, event4, event5, phone } = req.body
    try {
        const newRegister = new Register({
            TeamLeader: teamleader,
            teammate1: team1,
            teammate2: team2,
            teammate3: team3,
            collegename: clg,
            dept: dept,
            year: year,
            mail: mail,
            event1: event1,
            event2: event2,
            event3: event3,
            event4: event4,
            event5: event5,
            phone: phone,
        })
        const data =
            "TeamLeader:" + teamleader + "\nteammate1:" + team1 + "\nteammate2:" + team2 +
            "\nteammate3:" + team3 +
            "\ncollegename:" + clg +
            "\ndept:" + dept +
            "\nyear:" + year +
            "\nevent1:" + event1 +
            "\nevent2:" + event2 +
            "\nevent3:" + event3 +
            "\nevent4:" + event4 +
            "\nevent5:" + event5 +
            "\nphone:" + phone

        let img = await QRCode.toDataURL((data));
        const user = await newRegister.save()
        var mailOptions = {
            from: 'uit20227@rmd.ac.in',
            to: mail,
            subject: 'Confirmation Mail',
            text: 'Thank you for registering\n Here is your QR code',
            attachDataUrls: true,
            html: 'Thank you for registering </br> Here is your QR code <img src="' + img + '">'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                //Handle error here
                res.status(401)
                res.send('Please try again!');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200)
                res.send('Thanks for registering! Please confirm your email! We have sent a link!');
            }
        });

        return res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }

})
mongoose.connect('mongodb+srv://Yokesh:Yokesh@cluster0.hvswkm0.mongodb.net/registration?retryWrites=true&w=majority', console.log("Database connected"))
