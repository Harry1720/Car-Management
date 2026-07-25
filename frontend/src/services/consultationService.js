import { apiClient } from './apiClient';

export const consultationService = {
  createConsultation: async (data) => {
    try {
      const response = await apiClient.post('/consultations', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi khi gửi yêu cầu tư vấn' };
    }
  },

  getConsultations: async (page = 1, limit = 20, filters = {}) => {
    try {
      const params = { page, limit, ...filters };
      const response = await apiClient.get('/consultations', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi khi lấy danh sách tư vấn' };
    }
  },

  updateConsultationStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/consultations/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi khi cập nhật trạng thái' };
    }
  }
};
