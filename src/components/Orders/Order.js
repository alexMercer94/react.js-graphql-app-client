import React from 'react';
import { GET_PRODUCT } from '../../Queries';
import { Query, Mutation } from 'react-apollo';
import Resumen from './Resumen';
import { UPDATE_STATE } from '../../mutations';

import '../../orders.css';

const Order = props => {
    const { order } = props;
    const date = new Date(Number(order.date));
    const { id, total } = order;
    const { state } = order;

    let clase;
    if (state === 'PENDIENTE') {
        clase = 'border-light';
    } else if (state === 'CANCELADO') {
        clase = 'border-danger';
    } else {
        clase = 'border-success';
    }
    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`}>
                <div className="card-body">
                    <p className="card-text font-weight-bold ">
                        Estado:
                        <Mutation mutation={UPDATE_STATE}>
                            {updateState => (
                                <select
                                    className="form-control my-3"
                                    value={order.state}
                                    onChange={e => {
                                        const input = {
                                            id,
                                            order: order.order,
                                            date: order.date,
                                            total,
                                            client: props.client,
                                            state: e.target.value
                                        };
                                        updateState({
                                            variables: { input }
                                        });
                                    }}
                                >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}
                        </Mutation>
                    </p>
                    <p className="card-text font-weight-bold">
                        Pedido ID:
                        <span className="font-weight-normal"> {order.id}</span>
                    </p>
                    <p className="card-text font-weight-bold">
                        Fecha Pedido:
                        <span className="font-weight-normal"> {date.toLocaleString('es-MX')}</span>
                    </p>

                    <h3 className="resaltar-text card-text text-center mb-3">Artículos del pedido</h3>
                    {order.order.map((product, index) => {
                        const { id } = product;
                        return (
                            <Query key={order.id + index} query={GET_PRODUCT} variables={{ id }}>
                                {({ loading, error, data }) => {
                                    if (loading) return 'Cargando...';
                                    if (error) return `Error ${error.message}`;
                                    return (
                                        <Resumen
                                            product={data.getProduct}
                                            amount={product.amount}
                                            key={product.id}
                                        ></Resumen>
                                    );
                                }}
                            </Query>
                        );
                    })}
                    <div className="d-flex align-items-center">
                        <p className="card-text resaltar-text mr-1 bg-yellw">Total:</p>
                        <p className="font-weight-normal inc-text"> $ {order.total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
