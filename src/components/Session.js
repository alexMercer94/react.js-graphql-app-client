/**
 * High order component que comtiene todod los datos de autenticación
 */
import React from 'react';
import { Query } from 'react-apollo';
import { ACTUAL_USER } from '../Queries';

const Session = Component => props => {
    return (
        <Query query={ACTUAL_USER}>
            {({ loading, error, data, refetch }) => {
                if (loading) return null;
                return <Component {...props} refetch={refetch} session={data}></Component>;
            }}
        </Query>
    );
};

export default Session;
