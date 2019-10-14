import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_PRODUCTS } from '../../Queries';
import { DELETE_PRODUCT } from '../../mutations';
import Success from '../Alerts/Success';

class Products extends Component {
    state = {
        alert: {
            show: false,
            message: ''
        }
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
                <Query query={GET_PRODUCTS} pollInterval={1000}>
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) {
                            return 'Cargando...';
                        }
                        if (error) return `Error: ${error.message}`;

                        return (
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

                                        return (
                                            <tr key={id}>
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
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default Products;
