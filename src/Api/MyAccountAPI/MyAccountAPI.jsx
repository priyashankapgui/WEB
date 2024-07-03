import axios from 'axios';
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const token = secureLocalStorage.getItem('accessToken');

export const customerUpdate = async (customerId, customerData) => {
    console.log("customerData kjwnfknwkvvn",customerData);
    try {
        const response = await api.put(`/api/customers/${customerId}`, 
            customerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating customer:', error);
        return error.response ? error.response : error;
    }
}

export const customerUpdatePassword = async (customerId, oldPassword, newPassword) => {
    try {
        const response = await api.post(`/api/customers/password/${customerId}`, {
            oldPassword,
            newPassword
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        console.error('Error updating password:', error);
        return error.response ? error.response : error;
    }
}