import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_PRODUCT } from '../../Queries';
import FormEditProduct from './FormEditProduct';

class EditProduct extends Component {
    render() {
        // Get ID to edit
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <h1 className="text-center">Editar Producto</h1>
                <div className="row justify-content-center">
                    <Query query={GET_PRODUCT} variables={{ id }}>
                        {({ loading, error, data, refetch }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error ${error.message}`;
                            return (
                                <FormEditProduct product={data.getProduct} id={id} refetch={refetch}></FormEditProduct>
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditProduct;
