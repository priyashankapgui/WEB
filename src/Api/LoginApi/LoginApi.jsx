import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loginCustomer = async (email, password) => {
    try {
        const response = await api.post('/api/customers/login', {
            email,
            password
        });
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        return error.response ? error.response : error;
    }
}

export const registerCustomer = async (customerData) => {
    try {
        const response = await api.post('/api/customers/registercustomer',
            customerData
        );
        return response;
    } catch (error) {
        console.error('Error registering:', error);
        return error.response ? error.response : error;
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/api/customers/login/forgotpw', {
            email
        });
        return response;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return error.response ? error.response : error;
    }
}

export const resetPassword = async (resetToken, newPassword, confirmPassword ) => {
    try {
        const response = await api.post('/api/customers/login/forgotpw/resetpw', {
            resetToken,
            newPassword,
            confirmPassword 
        });
        return response;
    } catch (error) {
        console.error('Error resetting password:', error);
        return error.response ? error.response : error;
    }
}