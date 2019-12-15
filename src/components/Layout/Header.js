import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RegisterButton from './RegisterButton';

const Header = ({ session }) => {
    let barra = session.getUser ? (
        <NavigationAuthenticated session={session}></NavigationAuthenticated>
    ) : (
        <NavigationNoAuthenticated></NavigationNoAuthenticated>
    );
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">{barra}</div>
        </nav>
    );
};

const NavigationNoAuthenticated = () => (
    <h3 to="/" className="navbar-brand text-light font-weight-bold">
        CRM
    </h3>
);

const NavigationAuthenticated = ({ session }) => (
    <Fragment>
        <Link to="/" className="navbar-brand text-light font-weight-bold">
            CRM
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navegacion"
            aria-controls="navegacion"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                        Clientes
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/clients" className="dropdown-item">
                            Ver clientes
                        </Link>
                        <Link to="/clients/new" className="dropdown-item">
                            Nuevo cliente
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                        Productos
                    </button>

                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/products" className="dropdown-item">
                            Ver Productos
                        </Link>
                        <Link to="/products/new" className="dropdown-item">
                            Nuevo Producto
                        </Link>
                    </div>
                </li>
                <RegisterButton session={session}></RegisterButton>
                <Logout></Logout>
            </ul>
        </div>
    </Fragment>
);

export default Header;
