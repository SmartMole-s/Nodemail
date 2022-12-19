const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

var allowlist = ['http://localhost:3030', '*']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.yandex.com",
    auth: {
        user: 'noreply@smartfarm.shop',
        pass: 'N0@R3P1y2020*',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});


route.post('/send-form', cors(corsOptionsDelegate), (req, res) => {

    let fullname = req.body.fullname
    let email = req.body.email
    let subjects = req.body.subjects
    let message = req.body.message
    const mailData = {
        from: 'akinturan@smartmoles.com',
        to: 'cagkancaglar@smartmoles.com',
        subject: `${fullname} bir mesaj gönderdi`,
        html: `<b>${subjects}</b><br> ${message}<br/><br>Gönderenin mail adresi: ${email}<br/>`
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});