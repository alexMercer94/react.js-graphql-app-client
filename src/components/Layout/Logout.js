import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const closeUserSession = (client, history) => {
    localStorage.removeItem('token', '');
    // Deslogear al usuario
    client.resetStore();
    history.push('/login');
};

const Logout = ({ history }) => (
    <ApolloConsumer>
        {client => {
            return (
                <button
                    onClick={() => closeUserSession(client, history)}
                    className="btn btn-light ml-md-2 mt-2 mt-md-0"
                >
                    Cerrar sesión
                </button>
            );
        }}
    </ApolloConsumer>
);

export default withRouter(Logout);
