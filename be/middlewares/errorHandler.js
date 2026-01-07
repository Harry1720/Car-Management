const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Lỗi server';

  res.status(status).json({
    success: false,
    status,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

module.exports = errorHandler;
