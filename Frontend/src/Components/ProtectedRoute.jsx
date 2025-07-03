// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('companyToken');

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/" replace />;
    }

    // If token exists, render the children components
    return children;
};

export default ProtectedRoute;
