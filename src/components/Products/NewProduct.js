import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { NEW_PRODUCT } from '../../mutations';

const initialState = {
    name: '',
    price: '',
    stock: ''
};

class NewProduct extends Component {
    state = {
        ...initialState
    };

    cleanState = () => {
        this.setState({
            ...initialState
        });
    };

    updateState = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    validateForm = () => {
        const { name, price, stock } = this.state;
        const noValid = !name || !price || !stock;
        return noValid;
    };

    createNewProuct = (e, newProduct) => {
        e.preventDefault();
        // Insert in BD
        newProduct().then(data => {
            this.cleanState();
            // Direccionar
            this.props.history.push('/products');
        });
    };

    render() {
        const { name, price, stock } = this.state;
        const input = {
            name,
            price: Number(price),
            stock: Number(stock)
        };
        return (
            <Fragment>
                <h1 className="text-center">Nuevo Producto</h1>
                <div className="row justify-content-center">
                    <Mutation mutation={NEW_PRODUCT} variables={{ input }}>
                        {(newProduct, { loading, error, data }) => {
                            return (
                                <form className="col-md-8" onSubmit={e => this.createNewProuct(e, newProduct)}>
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Nombre del Producto"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                placeholder="Precio del Producto"
                                                onChange={this.updateState}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock:</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="form-control"
                                            placeholder="stock del Producto"
                                            onChange={this.updateState}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success float-right"
                                        disabled={this.validateForm()}
                                    >
                                        Crear Producto
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NewProduct;
