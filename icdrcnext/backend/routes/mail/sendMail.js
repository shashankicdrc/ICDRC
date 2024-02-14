var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kartikey.chaudhary.webdesys@gmail.com',
    pass: 'pulz gygf jlct ragt'
  }
});

var mailOptions = {
  from: 'kartikey.chaudhary.webdesys@gmail.com',
  to: 'kartikey9949@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});