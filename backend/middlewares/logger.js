const fs = require('fs');
const path = require('path');

// Tạo thư mục logs nếu chưa có
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip}`;

  // Log to console
  console.log(logMessage);

  // Log to file
  const logFile = path.join(logsDir, 'access.log');
  fs.appendFileSync(logFile, logMessage + '\n');

  next();
};

module.exports = logger;
