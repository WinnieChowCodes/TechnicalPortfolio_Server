require('dotenv').config();
const path = require('path');
const sgMail = require('@sendgrid/mail');
const express = require('express')
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/contact', (req, res) => {
    console.log(req);
    const msg = {
        to: `WinnieChow606@outlook.com`, // Change to your recipient
        from: 'WinnieChow606@outlook.com', // Change to your verified sender
        subject: req.body.subject,
        text: `Message from ${req.body.email}:\n${req.body.message}`,
    }
    try {
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });

app.listen(3000, () => { console.log(`Listening on port 3000`); });
