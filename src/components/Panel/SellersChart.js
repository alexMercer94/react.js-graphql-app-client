import React from 'react';
import { Query } from 'react-apollo';
import { TOP_SELLERS } from '../../Queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SellersChart = props => {
    return (
        <Query query={TOP_SELLERS}>
            {({ loading, error, data }) => {
                if (loading) return 'Cargando...';
                if (error) return `Error ${error.message}`;
                const topSellersChart = [];
                data.topSellers.map((seller, index) => {
                    topSellersChart[index] = {
                        ...seller.seller[0],
                        total: seller.total
                    };
                });
                return (
                    <BarChart
                        width={800}
                        height={300}
                        data={topSellersChart}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#6148b9" />
                    </BarChart>
                );
            }}
        </Query>
    );
};

export default SellersChart;
