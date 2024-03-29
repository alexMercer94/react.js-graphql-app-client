import React from 'react';
import { Link } from 'react-router-dom';

const RegisterButton = ({ session }) => {
    const { role } = session.getUser;
    if (role !== 'ADMINISTRATOR') return null;
    return (
        <Link to="/register" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
            Crear Usuarios
        </Link>
    );
};

export default RegisterButton;
