import apiClient from '../utils/apiClient';

export const depositService = {
  // Lấy danh sách đặt cọc
  getAllDeposits: async (page = 1, limit = 10, status = '') => {
    try {
      const response = await apiClient.get('/deposits', {
        params: { page, limit, status },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy chi tiết đặt cọc
  getDepositById: async (id) => {
    try {
      const response = await apiClient.get(`/deposits/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Tạo đặt cọc mới
  createDeposit: async (depositData) => {
    try {
      const response = await apiClient.post('/deposits', depositData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật đặt cọc
  updateDeposit: async (id, depositData) => {
    try {
      const response = await apiClient.put(`/deposits/${id}`, depositData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Xóa đặt cọc
  deleteDeposit: async (id) => {
    try {
      const response = await apiClient.delete(`/deposits/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy đặt cọc theo khách hàng
  getDepositsByCustomer: async (customerId) => {
    try {
      const response = await apiClient.get(`/deposits/customer/${customerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
