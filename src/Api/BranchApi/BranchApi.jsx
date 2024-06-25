// BranchAPI.jsx
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getBranchOptions = async () => {
    try {
        const response = await api.get('/branchesWeb');
        return response.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        throw error;
    }
};