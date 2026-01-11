import apiClient from '../utils/apiClient';

export const dashboardService = {
  // Lấy thống kê tổng quát
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy doanh thu theo tháng
  getMonthlyRevenue: async () => {
    try {
      const response = await apiClient.get('/dashboard/revenue/monthly');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy xe bán chạy nhất
  getTopSellingCars: async () => {
    try {
      const response = await apiClient.get('/dashboard/cars/top-selling');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thống kê đặt cọc
  getDepositStatistics: async () => {
    try {
      const response = await apiClient.get('/dashboard/deposits/statistics');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thống kê giao dịch
  getTransactionStatistics: async (date) => {
    try {
      const params = date ? { date } : {};
      const response = await apiClient.get('/dashboard/transactions/statistics', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy giao dịch gần đây
  getRecentTransactions: async (limit = 10) => {
    try {
      const response = await apiClient.get('/dashboard/transactions/recent', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy trạng thái kho hàng
  getCarInventoryStatus: async () => {
    try {
      const response = await apiClient.get('/dashboard/inventory/status');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
