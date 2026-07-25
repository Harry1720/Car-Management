import apiClient from '../utils/apiClient';

export const transactionService = {
    getAllTransactions: async () => {
        try {
            const response = await apiClient.get('/transactions');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTransactionById: async (id) => {
        try {
            const response = await apiClient.get(`/transactions/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createTransaction: async (transactionData) => {
        try {
            const response = await apiClient.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTransaction: async (id, transactionData) => {
        try {
            const response = await apiClient.put(`/transactions/${id}`, transactionData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTransaction: async (id) => {
        try {
            const response = await apiClient.delete(`/transactions/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTransactionsByCustomer: async (customerId) => {
        try {
            const response = await apiClient.get(`/transactions/customer/${customerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTransactionsByDepositId: async (depositId) => {
        try {
            const response = await apiClient.get(`/transactions/deposit/${depositId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
