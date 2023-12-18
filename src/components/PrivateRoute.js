import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return the provided element (will render the child components)
    // If not, return an element that will navigate to the login page
    return auth ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
