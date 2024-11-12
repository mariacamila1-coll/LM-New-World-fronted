import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica si el usuario tiene un token
    return token ? children : <Navigate to="/" />; // Si no hay token, redirige al login
};

export default PrivateRoute;
