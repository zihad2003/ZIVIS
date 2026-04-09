import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import authServices from '../../services/authServices.jsx';

const AuthStates = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authServices.login(email, password);
            const { accessToken, user: userData } = response.data.data;
            
            setUser(userData);
            setToken(accessToken);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return response.data;
        } catch (error) {
            console.error("Login failed bhai:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthStates;
