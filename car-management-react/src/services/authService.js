import apiClient from '../utils/apiClient';

export const authService = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng nhập
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật thông tin user
  updateUser: async (userData) => {
    try {
      const response = await apiClient.put('/auth/update', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đổi mật khẩu
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await apiClient.put('/auth/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
  },
};
