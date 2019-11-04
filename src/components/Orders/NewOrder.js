import React, { Component, Fragment } from 'react';
import ClientData from './ClientData';
import { Query } from 'react-apollo';
import { GET_PRODUCTS } from '../../Queries';

import '../../Spinner.css';
import OrderContent from './OrderContent';

class NewOrder extends Component {
    render() {
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <h1 className="text-center mb-5">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-2">
                        <ClientData id={id}></ClientData>
                    </div>
                    <div className="col-md-9">
                        <Query query={GET_PRODUCTS} variables={{ stock: true }}>
                            {({ loading, error, data }) => {
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

                                return <OrderContent id={id} products={data.getProducts}></OrderContent>;
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NewOrder;