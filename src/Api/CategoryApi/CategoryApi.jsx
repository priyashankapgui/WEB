import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAllCategory = async () => {
    try {
        const response = await api.get('/categories');
        const categories = response.data; // Assuming response.data contains the categories
        console.log('Categories:', categories); // Logging the fetched categories
        return categories;
        
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export default api;
