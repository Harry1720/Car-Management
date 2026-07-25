import apiClient from '../utils/apiClient';

export const accountingService = {
    getAccountingData: async () => {
        try {
            const response = await apiClient.get('/accounting');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getMonthlyRevenue: async () => {
        try {
            const response = await apiClient.get('/accounting/monthly-revenue');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAccounting: async (accountingData) => {
        try {
            const response = await apiClient.post('/accounting', accountingData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
