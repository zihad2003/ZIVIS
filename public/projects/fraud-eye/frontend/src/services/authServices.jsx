import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api/v1';

const login = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export default {
    login,
};
