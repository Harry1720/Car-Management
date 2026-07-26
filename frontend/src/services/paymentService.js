import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
