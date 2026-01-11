import apiClient from '../utils/apiClient';

export const carService = {
  // Lấy danh sách xe
  getAllCars: async (page = 1, limit = 10, category = '', status = '') => {
    try {
      const response = await apiClient.get('/cars', {
        params: { page, limit, category, status },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy chi tiết xe
  getCarById: async (id) => {
    try {
      const response = await apiClient.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy xe theo danh mục
  getCarsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/cars/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Tạo xe mới
  createCar: async (carData) => {
    try {
      const response = await apiClient.post('/cars', carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật xe
  updateCar: async (id, carData) => {
    try {
      const response = await apiClient.put(`/cars/${id}`, carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Xóa xe
  deleteCar: async (id) => {
    try {
      const response = await apiClient.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
