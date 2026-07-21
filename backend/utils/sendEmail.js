const axios = require('axios');

const sendEmail = async (options) => {
  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY, // Yêu cầu bắt buộc khi gửi từ Node.js (Server)
    template_params: {
      to_email: options.email,
      subject: options.subject,
      message: options.message,
    }
  };

  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
  } catch (error) {
    console.error('EmailJS Error:', error.response ? error.response.data : error.message);
    throw new Error('Lỗi khi gửi email qua EmailJS');
  }
};

module.exports = sendEmail;
