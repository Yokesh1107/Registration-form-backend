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
app.use(express.static('backend'));
app.use(cors({ credentials: true, origin: 'https://techcrescenza2k24.onrender.com' }))
const Register = require('./registerModel')
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
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
            Scriptorias_secret: event1,
            Code_Quasar: event2,
            Mensa_Mingle: event3,
            Croma_meister: event4,
            Surprise_event: event5,
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
            from: '"Techcrescenza2k24" <uit20227@rmd.ac.in>',
            to: mail,
            subject: 'Confirmation Mail',
            text: 'Thank you for registering\n Here is your QR code',
            attachDataUrls: true,
            html: 'Thank you for registering <br> <b>Here is your QR code</b><br> <img src="' + img + '"><br> Have a nice day☺️<br><b>IMPORTANT!</b><br>Kindly be in the campus before <b><i>9AM</i></b><br>Late entries are not entertained<br>Do not indulge in any mischievous activity<br> Verify your registration by showing your college id at the department entrance<br>For coding event kindly sign up at <a href="https://www.hackerrank.com/code-quasar-1">Entry event</a><br>'
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
mongoose.connect(process.env.MONGO_URL, console.log("Database connected"))
