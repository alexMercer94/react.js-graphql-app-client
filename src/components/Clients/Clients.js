import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CLIENTS_QUERY } from '../../Queries';
import { DELETE_CLIENT } from '../../mutations';
import Paginator from '../Paginator';
import Success from '../Alerts/Success';

class Clients extends Component {
    limit = 10;

    state = {
        paginator: {
            offset: 0,
            actual: 1
        },
        alert: {
            show: false,
            message: ''
        }
    };

    previousPage = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset - this.limit,
                actual: this.state.paginator.actual - 1
            }
        });
    };

    nextPage = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset + this.limit,
                actual: this.state.paginator.actual + 1
            }
        });
    };

    render() {
        const {
            alert: { show, message }
        } = this.state;

        const alert = show ? <Success message={message}></Success> : '';

        return (
            <Query
                query={CLIENTS_QUERY}
                pollInterval={1000}
                variables={{ limit: this.limit, offset: this.state.paginator.offset }}
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) {
                        return 'Cargando...';
                    }
                    if (error) return `Error: ${error.message}`;

                    return (
                        <Fragment>
                            <h2 className="text-center mt-4">Listado Clientes</h2>
                            {alert}
                            <ul className="list-group mt-4">
                                {data.getClients.map(client => {
                                    const { id } = client;
                                    return (
                                        <li key={client.id} className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-5 d-flex justify-content-between align-items-center">
                                                    {client.name} {client.surname} - {client.company}
                                                </div>
                                                <div className="col-md-7 d-flex justify-content-end">
                                                    <Link
                                                        to={`/orders/new/${id}`}
                                                        className="btn btn-warning d-block d-md-inline-block mr-2"
                                                    >
                                                        &#43; Nuevo Pedido
                                                    </Link>
                                                    <Link
                                                        to={`/orders/${id}`}
                                                        className="btn btn-primary d-block d-md-inline-block mr-2"
                                                    >
                                                        Ver Pedidos
                                                    </Link>
                                                    <Mutation
                                                        mutation={DELETE_CLIENT}
                                                        onCompleted={data => {
                                                            // console.log(data);
                                                            this.setState(
                                                                {
                                                                    alert: {
                                                                        show: true,
                                                                        message: data.deleteClient
                                                                    }
                                                                },
                                                                () => {
                                                                    setTimeout(() => {
                                                                        this.setState({
                                                                            alert: {
                                                                                show: false,
                                                                                message: ''
                                                                            }
                                                                        });
                                                                    }, 3000);
                                                                }
                                                            );
                                                        }}
                                                    >
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
                                                        to={`/clients/edit/${client.id}`}
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
                            <Paginator
                                actual={this.state.paginator.actual}
                                total={data.totalClients}
                                limit={this.limit}
                                previousPage={this.previousPage}
                                nextPage={this.nextPage}
                            ></Paginator>
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default Clients;
