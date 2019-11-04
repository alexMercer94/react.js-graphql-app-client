import React, { Component, Fragment } from 'react';

class Product extends Component {
    state = {};

    render() {
        const { product } = this.props;

        return (
            <Fragment>
                <tr>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                        <input
                            min="1"
                            type="number"
                            className="form-control"
                            onChange={e => {
                                if (e.target.value > product.stock) {
                                    e.target.value = 0;
                                }
                                this.props.updateAmount(e.target.value, this.props.index);
                            }}
                        ></input>
                    </td>
                    <td>
                        <button
                            onClick={e => this.props.deleteProduct(product.id)}
                            type="button"
                            className="btn btn-danger font-weight-bold"
                        >
                            &times; Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Product;
