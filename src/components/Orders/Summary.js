import React, { Fragment } from 'react';
import Product from './Product';

const Summary = props => {
    const products = props.products;

    if (products.length === 0) return null;

    return (
        <Fragment>
            <h2 className="text-center my-5">Resumen y Cantidades</h2>
            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Price</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <Product
                            key={Product.id}
                            id={product.id}
                            product={product}
                            index={index}
                            updateAmount={props.updateAmount}
                            deleteProduct={props.deleteProduct}
                        ></Product>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Summary;
