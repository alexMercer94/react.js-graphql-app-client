import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CLIENTS_QUERY } from '../Queries';
import { DELETE_CLIENT } from '../mutations';

const Clients = props => (
    <Query query={CLIENTS_QUERY} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) {
                return 'Cargando...';
            }
            if (error) return `Error: ${error.message}`;

            return (
                <Fragment>
                    <h2 className="text-center mt-4">Listado Clientes</h2>
                    <ul className="list-group mt-4">
                        {data.getClients.map(client => {
                            const { id } = client;
                            return (
                                <li key={client.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            {client.name} {client.surname} - {client.company}
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Mutation mutation={DELETE_CLIENT}>
                                                {deleteClient => (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger b-block d-md-inline-block mr-2"
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    'Seguro que deseas eliminar este cliente?'
                                                                )
                                                            ) {
                                                                deleteClient({
                                                                    variables: { id }
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        &times; Eliminar
                                                    </button>
                                                )}
                                            </Mutation>
                                            <Link
                                                to={`/client/edit/${client.id}`}
                                                className="btn btn-success d-block d-md-inline-block"
                                            >
                                                Editar Cliente
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Fragment>
            );
        }}
    </Query>
);

export default Clients;
