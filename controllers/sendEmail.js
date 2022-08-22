const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const sgMail = require("@sendgrid/mail");

let mailer = "Mailgun";

//// mailGun ////
const sendEmail_mailGun = async (req, res) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  let transporter = nodemailer.createTransport(nodemailMailgun(auth));

  const msg = {
    to: "gtrapp@gmail.com",
    to_name: "George Trapp",
    from: "mail@georgetrapp.com",
    from_name: "John Doe",
    subject: "Sending via Mailgun",
    text: "Hello from Mailgun",
  };

  validEmail = validateEmail(msg.to, msg.from);
  validInput = validateInput(msg.to_name, msg.from_name, msg.subject, msg.text);

  console.log(validEmail);
  console.log(validInput);

  if (!validEmail || !validInput) {
    console.log(` => Please check email address and input field!`);
  } else {
    transporter.sendMail(msg, function (err, data) {
      if (err) {
        sendEmail_sendGrid();
        console.log("OMG Error: ", err);
      } else {
        res.json(msg);
        console.log("Mailgun sent!");
      }
    });
  }
};

//// sendGrid ////
const sendEmail_sendGrid = async (req, res) => {
  console.log("SENDGRID HERE");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "gtrapp@gmail.com",
    to_name: "George Trapp",
    from: "mail@georgetrapp.com",
    from_name: "George Trapp",
    subject: "Sending via SendGrid",
    text: "Hello from SendGrid",
  };
  validEmail = validateEmail(msg.to, msg.from);
  validInput = validateInput(msg.to_name, msg.from_name, msg.subject, msg.text);

  if (!validEmail || !validInput) {
    console.log(` => Please check email address and input field!`);
  } else if (validEmail && validInput) {
    const info = await sgMail.send(msg);
    res.json(info);
    console.log("Sendgrid sent!");
  } else {  
    sendEmail_mailGun();
    console.log("Error with Sendgrid, trying Mailgun!");
  }
};

// Valid email address and Input Fields
function validateEmail(a, b) {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (reg.test(a) && reg.test(b)) {
    return true;
  } else {
    return false;
  }
}

function validateInput(a, b, c, d) {
  if (a && b && c && d !== "") {
    return true;
  } else {
    return false;
  }
}

function sendEmail() {
  if (mailer === "Mailgun") {
    mailer = sendEmail_mailGun;
  } else {
    mailer = sendEmail_sendGrid;
  }
}

sendEmail();

module.exports = mailer;
