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
        from: 'noreply@smartfarm.shop',
        to: 'akinturan@smartmoles.com',
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

route.post('/send-seller', cors(corsOptionsDelegate), (req, res) => {

    let companyName = req.body.companyName
    let authorizedPersonFullName = req.body.authorizedPersonFullName
    let companyPhone = req.body.companyPhone
    let userPhone = req.body.userPhone
    let email = req.body.email
    let website = req.body.website
    let adress = req.body.adress
    let tax = req.body.tax
    let taxNumber = req.body.taxNumber
    let registeredChamberOfCommerce = req.body.registeredChamberOfCommerce
    let tradeRegisteryNumber = req.body.tradeRegisteryNumber
    let foundationYear = req.body.foundationYear
    let personalNumber = req.body.personalNumber
    let fieldsOfActivity = req.body.fieldsOfActivity
    let references = req.body.references
    let dealerGeographicArea = req.body.dealerGeographicArea
    let otherDealers = req.body.otherDealers
    const mailData = {
        from: 'noreply@smartfarm.shop',
        to: 'akinturan@smartmoles.com',
        subject: `${companyName} bir mesaj gönderdi`,
        html: `<html>
        <head>
        <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        </style>
        </head>
        <body>
        <h1 style="text-align:center"> Bayilik Başvuru Formu</h1>
        <table style="width:100%">
          <tr>
            <th>Şirket Ünvanı:</th>
            <td>${companyName}</td>
          </tr>
          <tr>
            <th>Yetkili kişi Ad ve Soyadı:</th>
            <td>${authorizedPersonFullName}</td>
          </tr>
          <tr>
            <th>Şirket Telefonu:</th>
            <td>${companyPhone}</td>
          </tr>
          <tr>
            <th>Telefon (GSM):</th>
            <td>${userPhone}</td>
          </tr>
          <tr>
            <th>E-Posta:</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Açık Adres:</th>
            <td>${adress}</td>
          </tr>
          <tr>
            <th>Web Sayfası:</th>
            <td>${website}</td>
          </tr>
          <tr>
            <th>Vergi Dairesi:</th>
            <td>${tax}</td>
          </tr>
          <tr>
            <th>Vergi Numarası:</th>
            <td>${taxNumber}</td>
          </tr>
          <tr>
            <th>Bağlı Olduğu Ticaret Odası:</th>
            <td>${registeredChamberOfCommerce}</td>
          </tr>
          <tr>
            <th>Ticaret Sicil No:</th>
            <td>${tradeRegisteryNumber}</td>
          </tr>
          <tr>
            <th>Kuruluş Yılı:</th>
            <td>${foundationYear}</td>
          </tr>
          <tr>
            <th>Personel Sayısı:</th>
            <td>${personalNumber}</td>
          </tr>
          <tr>
            <th>Faaliyet Alanları:</th>
            <td>${fieldsOfActivity}</td>
          </tr>
         <tr>
            <th>Referanslarınız:</th>
            <td>${references}</td>
          </tr>
          <tr>
            <th>Bayilik Yapmak istediğiniz Coğrafi Alan:</th>
            <td>${dealerGeographicArea}</td>
          </tr>
          <tr>
            <th>Varsa Sahip Olduğunuz Diğer Bayilikler:</th>
            <td>${otherDealers}</td>
          </tr>
        </table>
        
        </body>
        </html>
        `
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});