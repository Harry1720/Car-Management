import apiClient from '../utils/apiClient';

export const customerService = {
  // Lấy danh sách khách hàng
  getAllCustomers: async (page = 1, limit = 10, status = '') => {
    try {
      const response = await apiClient.get('/customers', {
        params: { page, limit, status },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy chi tiết khách hàng
  getCustomerById: async (id) => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Tạo khách hàng mới
  createCustomer: async (customerData) => {
    try {
      const response = await apiClient.post('/customers', customerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật khách hàng
  updateCustomer: async (id, customerData) => {
    try {
      const response = await apiClient.put(`/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Xóa khách hàng
  deleteCustomer: async (id) => {
    try {
      const response = await apiClient.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Thêm xe vào danh sách yêu thích
  addCarInterest: async (customerId, carId) => {
    try {
      const response = await apiClient.post(`/customers/${customerId}/cars/${carId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Xóa xe khỏi danh sách yêu thích
  removeCarInterest: async (customerId, carId) => {
    try {
      const response = await apiClient.delete(`/customers/${customerId}/cars/${carId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
