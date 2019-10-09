import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
    {
        getClients {
            id
            name
            surname
            company
        }
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
