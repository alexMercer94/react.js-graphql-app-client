import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_PRODUCTS } from '../../Queries';
import { DELETE_PRODUCT } from '../../mutations';
import Success from '../Alerts/Success';
import Paginator from '../Paginator';

class Products extends Component {
    limit = 2;

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
            <Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                {alert}
                <Query
                    query={GET_PRODUCTS}
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
                                <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Existencia</th>
                                            <th scope="col">Eliminar</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.getProducts.map(item => {
                                            const { id } = item;
                                            const { stock } = item;

                                            let clase;
                                            if (stock < 50) {
                                                clase = 'table-danger text-light';
                                            } else if (stock > 51 && stock < 100) {
                                                clase = 'table-warning';
                                            }

                                            return (
                                                <tr key={id} className={clase}>
                                                    <td>{item.name}</td>
                                                    <td>${item.price}</td>
                                                    <td>{item.stock}</td>
                                                    <td>
                                                        <Mutation
                                                            mutation={DELETE_PRODUCT}
                                                            onCompleted={data => {
                                                                this.setState(
                                                                    {
                                                                        alert: {
                                                                            show: true,
                                                                            message: data.deleteProduct
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
                                                            {deleteProduct => (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm(
                                                                                'Seguro que deseas eliminar este producto?'
                                                                            )
                                                                        ) {
                                                                            deleteProduct({
                                                                                variables: { id }
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    &times; Eliminar
                                                                </button>
                                                            )}
                                                        </Mutation>
                                                    </td>
                                                    <td>
                                                        <Link to={`/products/edit/${id}`} className="btn btn-warning">
                                                            Editar Producto
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <Paginator
                                    actual={this.state.paginator.actual}
                                    total={data.totalProducts}
                                    limit={this.limit}
                                    previousPage={this.previousPage}
                                    nextPage={this.nextPage}
                                ></Paginator>
                            </Fragment>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default Products;
