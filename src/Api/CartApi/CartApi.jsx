import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getCartItemsByCartId = async (cartId) => {
    try {
        const response = await api.get(`/cart/items/${cartId}`);
        return response;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return error.response ? error.response : error;
    }
}

export const addToCart = async (cartItemData) => {
    try {
        const response = await api.post('/cart-items/add', cartItemData);
        return response;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return error.response ? error.response : error;
    }
}

export const updateCartItem = async (cartId, productId, updateData) => {
    try {
        const response = await api.put(`/cart/${cartId}/item/${productId}`, updateData);
        return response;
    } catch (error) {
        console.error('Error updating cart item:', error);
        return error.response ? error.response : error;
    }
}

export const deleteCartItem = async (cartId, productId) => {
    try {
        const response = await api.delete(`/cart/${cartId}/item/${productId}`);
        return response;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return error.response ? error.response : error;
    }
}
