import axios from 'axios';

// Nếu VITE_API_BASE_URL có đuôi /api thì bỏ đi cho các endpoint không thuộc /api hoặc tự nối lại
const API_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '') 
  : 'http://localhost:5000';

export const paymentService = {
  createPaymentUrl: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/payment/create_payment_url`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
