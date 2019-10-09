import React, { Component, Fragment } from 'react';
import { CLIENT_QUERY } from '../Queries';
import { Query } from 'react-apollo';
import FormEditClient from './FormEditClient';

class EditClient extends Component {
    render() {
        // Tomar el Id del Cliente a Editar
        const { id } = this.props.match.params;
        return (
            <Fragment>
                <h1 className="text-center">Editar Cliente</h1>
                <div className="row justify-content-center">
                    <Query query={CLIENT_QUERY} variables={{ id }}>
                        {({ loading, error, data, refetch }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error! ${error.message}`;

                            return <FormEditClient client={data.getClient} refetch={refetch}></FormEditClient>;
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditClient;
