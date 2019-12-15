import React, { Fragment } from 'react';
import ClientsChart from './ClientsChart';
import SellersChart from './SellersChart';

const Panel = props => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
            <ClientsChart></ClientsChart>

            <h1 className="text-center my-5">Top 10 Vendedores que más compran</h1>
            <SellersChart></SellersChart>
        </Fragment>
    );
};

export default Panel;
