import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
    query getClients($limit: Int, $offset: Int) {
        getClients(limit: $limit, offset: $offset) {
            id
            name
            surname
            company
        }
        totalClients
    }
`;

export const CLIENT_QUERY = gql`
    query consultClient($id: ID) {
        getClient(id: $id) {
            id
            name
            surname
            company
            emails {
                email
            }
            age
            type
            pedidos {
                product
                price
            }
        }
    }
`;
