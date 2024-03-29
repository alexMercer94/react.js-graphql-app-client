import React, { Fragment } from 'react';

const Resumen = ({ amount, product }) => {
    return (
        <Fragment>
            <div className="products-container mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre del Producto:
                    <span className="font-weight-normal"> {product.name}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal"> {amount}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio:
                    <span className="font-weight-normal"> ${product.price}</span>
                </p>
            </div>
        </Fragment>
    );
};

export default Resumen;
