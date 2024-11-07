// services/api.js
import axios from 'axios';

// Replace with your chosen API's base URL and your API key
const API_KEY = 'csmcsb1r01qn12jeqf10csmcsb1r01qn12jeqf1g';
const BASE_URL = 'https://finnhub.io/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const fetchStockData = async (symbol) => {
    try {
        const response = await api.get(`/stock/${symbol}/quote`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Add more functions as needed for portfolio and other data
