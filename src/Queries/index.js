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

export const GET_PRODUCTS = gql`
    query getProducts($limit: Int, $offset: Int) {
        getProducts(limit: $limit, offset: $offset) {
            id
            name
            price
            stock
        }
        totalProducts
    }
`;

export const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            name
            stock
            price
        }
    }
`;
