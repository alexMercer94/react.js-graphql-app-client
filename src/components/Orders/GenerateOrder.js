import React from 'react';
import { Mutation } from 'react-apollo';
import { NEW_ORDER } from '../../mutations';
import { withRouter } from 'react-router-dom';

const validateOrder = props => {
    let noValid = !props.products || props.total <= 0;
    return noValid;
};

const GenerateOrder = props => {
    return (
        <Mutation
            mutation={NEW_ORDER}
            onCompleted={() => {
                props.history.push('/clients');
            }}
        >
            {newOrder => (
                <button
                    onClick={e => {
                        const productsInput = props.products.map(({ name, price, stock, ...object }) => object);

                        const input = {
                            order: productsInput,
                            total: props.total,
                            client: props.idClient
                        };

                        newOrder({
                            variables: { input }
                        });
                    }}
                    disabled={validateOrder(props)}
                    type="button"
                    className="btn btn-warning mt-4"
                >
                    Generar Pedido
                </button>
            )}
        </Mutation>
    );
};

export default withRouter(GenerateOrder);
