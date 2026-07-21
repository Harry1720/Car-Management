const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Tạo transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Tùy chọn email
  const mailOptions = {
    from: `VinFast Car Management <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
