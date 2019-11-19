import React, { Fragment } from 'react';
import { GET_ORDERS } from '../../Queries';
import { Query } from 'react-apollo';

import '../../Spinner.css';
import Order from './Order';

const ClientOrders = props => {
    const client = props.match.params.id;

    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del Cliente</h1>
            <div className="row">
                <Query query={GET_ORDERS} variables={{ client }} pollInterval={500}>
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) {
                            return (
                                <div className="sk-fading-circle">
                                    <div className="sk-circle1 sk-circle"></div>
                                    <div className="sk-circle2 sk-circle"></div>
                                    <div className="sk-circle3 sk-circle"></div>
                                    <div className="sk-circle4 sk-circle"></div>
                                    <div className="sk-circle5 sk-circle"></div>
                                    <div className="sk-circle6 sk-circle"></div>
                                    <div className="sk-circle7 sk-circle"></div>
                                    <div className="sk-circle8 sk-circle"></div>
                                    <div className="sk-circle9 sk-circle"></div>
                                    <div className="sk-circle10 sk-circle"></div>
                                    <div className="sk-circle11 sk-circle"></div>
                                    <div className="sk-circle12 sk-circle"></div>
                                </div>
                            );
                        }
                        if (error) return `Error ${error.message}`;
                        return data.getOrders.map(order => (
                            <Order key={order.id} order={order} client={client}></Order>
                        ));
                    }}
                </Query>
            </div>
        </Fragment>
    );
};

export default ClientOrders;
