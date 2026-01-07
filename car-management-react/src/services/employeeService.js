import { apiClient } from './apiClient';

export const employeeService = {
    getAllEmployees: async () => {
        try {
            const response = await apiClient.get('/employees');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getEmployeeById: async (id) => {
        try {
            const response = await apiClient.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createEmployee: async (employeeData) => {
        try {
            const response = await apiClient.post('/employees', employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateEmployee: async (id, employeeData) => {
        try {
            const response = await apiClient.put(`/employees/${id}`, employeeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteEmployee: async (id) => {
        try {
            const response = await apiClient.delete(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
