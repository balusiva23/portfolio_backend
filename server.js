const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS for your React app

app.post('/send-email', async (req, res) => {
  const { fullname, phone, email, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sivabs123@gmail.com',
      pass: 'apzbdhoafgxyrowh',
    },
  });

  // Email data
  const mailOptions = {
    from: 'sivabs123@gmail.com',
    to: `${email}`,
    subject: subject,
    text: `Name: ${fullname}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Email could not be sent' });
  }
});
app.post('/submit-form', async (req, res) => {
  const { name, email, comments } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sivabs123@gmail.com',
      pass: 'apzbdhoafgxyrowh',
    },
  });

  // Email data
  const mailOptions = {
    from: 'sivabs123@gmail.com',
    to: `${email}`,
    subject: "Resume Downloaded",
    text: `Resume Downloaded :\n
    Name: ${name}\nEmail: ${email}\nMessage: ${comments}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Email could not be sent' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
