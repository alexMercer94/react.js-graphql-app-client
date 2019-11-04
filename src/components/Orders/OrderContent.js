import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Summary from './Summary';
import GenerateOrder from './GenerateOrder';
import Error from '../Alerts/Error';

class OrderContent extends Component {
    state = {
        products: [],
        total: 0
    };

    selectProduct = products => {
        this.setState({
            products
        });
    };

    updateTotal = () => {
        const products = this.state.products;

        // Cuando todos los productos estan en 0
        if (products.length === 0) {
            this.setState({
                total: 0
            });
            return;
        }

        let newTotal = 0;

        // Realizar la operación de cantidad x precio
        products.map(product => (newTotal += product.amount * product.price));

        this.setState({
            total: newTotal
        });
    };

    updateAmount = (amount, index) => {
        const products = this.state.products;

        // Agregar la cantidad desde la interfaz
        products[index].amount = Number(amount);

        // Agregar al state
        this.setState(
            {
                products
            },
            () => {
                this.updateTotal();
            }
        );
    };

    deleteProduct = id => {
        const products = this.state.products;
        const productsRestantes = products.filter(product => product.id !== id);
        this.setState(
            {
                products: productsRestantes
            },
            () => {
                this.updateTotal();
            }
        );
    };

    render() {
        const message = this.state.total < 0 ? <Error error="Las cantidades no pueden ser negativas XD"></Error> : '';
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                {message}
                <Select
                    onChange={this.selectProduct}
                    options={this.props.products}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={options => options.id}
                    getOptionLabel={options => options.name}
                    value={this.state.products}
                />
                <Summary
                    products={this.state.products}
                    updateAmount={this.updateAmount}
                    deleteProduct={this.deleteProduct}
                ></Summary>
                <p className="font-wight-bold float-right mt-3">
                    Total: <span className="font-weight-normal">$ {this.state.total}</span>
                </p>
                <GenerateOrder
                    idClient={this.props.id}
                    products={this.state.products}
                    total={this.state.total}
                ></GenerateOrder>
            </Fragment>
        );
    }
}

export default OrderContent;
