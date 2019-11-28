import React, { Fragment } from 'react';
import ClientsChart from './ClientsChart';

const Panel = props => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
            <ClientsChart></ClientsChart>
        </Fragment>
    );
};

export default Panel;
