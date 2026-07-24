import apiClient from '../utils/apiClient';

export const authService = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng nhập
  login: async (email, password, portal = 'user') => {
    try {
      const response = await apiClient.post('/auth/login', { email, password, portal });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
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
      const isFormData = userData instanceof FormData;
      const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined;
      
      const response = await apiClient.put('/auth/update', userData, { headers });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đổi mật khẩu
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Toggle theo dõi xe (Thả tim)
  toggleCarInterest: async (carId) => {
    try {
      const response = await apiClient.post(`/auth/interest/toggle/${carId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
  
  // Kiểm tra token còn hạn
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  
  // Lấy token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Quên mật khẩu
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
