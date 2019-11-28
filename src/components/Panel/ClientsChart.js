import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTS } from '../../Queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ClientsChart = props => {
    return (
        <Query query={TOP_CLIENTS}>
            {({ loading, error, data }) => {
                if (loading) return 'Cargando...';
                if (error) return `Error ${error.message}`;
                const topClientsChart = [];
                data.topClients.map((order, index) => {
                    topClientsChart[index] = {
                        ...order.client[0],
                        total: order.total
                    };
                });
                return (
                    <BarChart
                        width={800}
                        height={300}
                        data={topClientsChart}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                );
            }}
        </Query>
    );
};

export default ClientsChart;
